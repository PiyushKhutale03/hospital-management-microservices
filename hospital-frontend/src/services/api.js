import axios from 'axios';
import {
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  MOCK_APPOINTMENTS,
  MOCK_AI_RESPONSES
} from './mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8089';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authService = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return { success: true, data: response.data };
    } catch (err) {
      console.warn('API /auth/login unavailable, evaluating fallback login...');
      if (credentials.username.includes('admin')) {
        return {
          success: true,
          data: { token: 'demo-admin-jwt-token-12345', userId: 999, username: credentials.username, role: 'ADMIN' }
        };
      } else if (credentials.username.includes('doctor')) {
        return {
          success: true,
          data: { token: 'demo-doctor-jwt-token-12345', userId: 1, username: credentials.username, role: 'DOCTOR' }
        };
      } else {
        return {
          success: true,
          data: { token: 'demo-patient-jwt-token-12345', userId: 101, username: credentials.username, role: 'PATIENT' }
        };
      }
    }
  },

  signup: async (userData) => {
    try {
      const response = await apiClient.post('/auth/signup', userData);
      return { success: true, data: response.data };
    } catch (err) {
      console.warn('API /auth/signup unavailable, using local registration fallback...');
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 200,
          username: userData.username,
          name: userData.name || userData.username
        }
      };
    }
  }
};

export const doctorService = {
  getAllDoctors: async () => {
    try {
      const response = await apiClient.get('/doctors');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return MOCK_DOCTORS;
    } catch (err) {
      console.warn('API /doctors unavailable, fallback to mock doctors data.');
      return MOCK_DOCTORS;
    }
  },

  getDoctorById: async (id) => {
    try {
      const response = await apiClient.get(`/doctors/${id}`);
      return response.data;
    } catch (err) {
      const found = MOCK_DOCTORS.find(d => d.id === Number(id));
      return found || MOCK_DOCTORS[0];
    }
  },

  onboardDoctor: async (doctorData) => {
    try {
      const response = await apiClient.post('/admin/onBoardNewDoctor', doctorData);
      return { success: true, data: response.data };
    } catch (err) {
      console.warn('API /admin/onBoardNewDoctor fallback applied.');
      const newDoc = {
        id: Math.floor(Math.random() * 900) + 100,
        name: doctorData.name,
        specialization: doctorData.specialization,
        available: true,
        fee: '$100',
        rating: 5.0,
        experienceYears: 5,
        hospital: 'Medicare General Wing'
      };
      MOCK_DOCTORS.unshift(newDoc);
      return { success: true, data: newDoc };
    }
  },

  getDoctorAppointments: async () => {
    try {
      const response = await apiClient.get('/doctors/appointments');
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      return MOCK_APPOINTMENTS;
    } catch (err) {
      return MOCK_APPOINTMENTS;
    }
  }
};

export const patientService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/patient/profile');
      return response.data;
    } catch (err) {
      return MOCK_PATIENTS[0];
    }
  },

  getAllPatients: async (page = 0, size = 10, sortBy = 'name', sortDir = 'asc') => {
    try {
      const response = await apiClient.get(`/admin/patients?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return MOCK_PATIENTS;
    } catch (err) {
      return MOCK_PATIENTS;
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      const response = await apiClient.post('/patient/appointments', appointmentData);
      return { success: true, data: response.data };
    } catch (err) {
      console.warn('API /patient/appointments fallback creation applied.');
      const newAppt = {
        id: Math.floor(Math.random() * 9000) + 1000,
        patientId: appointmentData.patientId || 101,
        patientName: 'Alexander Ross',
        doctorId: appointmentData.doctorId,
        doctorName: 'Specialist Physician',
        specialization: 'General',
        appointmentTime: appointmentData.appointmentTime,
        symptoms: appointmentData.reason || 'Consultation',
        status: 'CONFIRMED',
      };
      MOCK_APPOINTMENTS.unshift(newAppt);
      return { success: true, data: newAppt };
    }
  }
};

export const aiAssistantService = {
  checkSymptoms: async (symptoms) => {
    try {
      const response = await apiClient.post('/ai/symptom-check', symptoms, {
        headers: { 'Content-Type': 'text/plain' }
      });
      return response.data;
    } catch (err) {
      await new Promise(r => setTimeout(r, 600));
      return MOCK_AI_RESPONSES.symptoms(symptoms);
    }
  },

  recommendDoctor: async (condition) => {
    try {
      const response = await apiClient.post('/ai/doctor-recommend', condition, {
        headers: { 'Content-Type': 'text/plain' }
      });
      return response.data;
    } catch (err) {
      await new Promise(r => setTimeout(r, 600));
      return MOCK_AI_RESPONSES.doctor(condition);
    }
  },

  getMedicineInfo: async (medicine) => {
    try {
      const response = await apiClient.post('/ai/medicine-info', medicine, {
        headers: { 'Content-Type': 'text/plain' }
      });
      return response.data;
    } catch (err) {
      await new Promise(r => setTimeout(r, 600));
      return MOCK_AI_RESPONSES.medicine(medicine);
    }
  },

  checkMedicineInteraction: async (medicines) => {
    try {
      const response = await apiClient.post('/ai/medicine-interaction', medicines, {
        headers: { 'Content-Type': 'text/plain' }
      });
      return response.data;
    } catch (err) {
      await new Promise(r => setTimeout(r, 600));
      return MOCK_AI_RESPONSES.interaction(medicines);
    }
  },

  checkEmergency: async (symptoms) => {
    try {
      const response = await apiClient.post('/ai/emergency-check', symptoms, {
        headers: { 'Content-Type': 'text/plain' }
      });
      return response.data;
    } catch (err) {
      await new Promise(r => setTimeout(r, 500));
      return MOCK_AI_RESPONSES.emergency(symptoms);
    }
  },

  getDietAdvice: async (condition) => {
    try {
      const response = await apiClient.post('/ai/diet-advice', condition, {
        headers: { 'Content-Type': 'text/plain' }
      });
      return response.data;
    } catch (err) {
      await new Promise(r => setTimeout(r, 600));
      return MOCK_AI_RESPONSES.diet(condition);
    }
  }
};