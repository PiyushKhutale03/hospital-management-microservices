import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';

import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import AiAssistantPage from './pages/AiAssistantPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);

  const handleOpenBookModal = (doctorId = null) => {
    setSelectedDoctorForBooking(doctorId);
    setIsBookModalOpen(true);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
          
          <Navbar onOpenBookModal={() => handleOpenBookModal()} />

          <main className="flex-1">
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    onOpenBookModal={() => handleOpenBookModal()} 
                    onSelectDoctorForBooking={(id) => handleOpenBookModal(id)}
                  />
                } 
              />
              <Route path="/ai-assistant" element={<AiAssistantPage />} />
              <Route 
                path="/patient" 
                element={
                  <ProtectedRoute allowedRoles={['PATIENT']}>
                    <PatientDashboard 
                      onOpenBookModal={() => handleOpenBookModal()} 
                      onSelectDoctorForBooking={(id) => handleOpenBookModal(id)}
                    />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor" 
                element={
                  <ProtectedRoute allowedRoles={['DOCTOR']}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Appointment Booking Modal */}
          <AppointmentModal
            isOpen={isBookModalOpen}
            onClose={() => setIsBookModalOpen(false)}
            selectedDoctorId={selectedDoctorForBooking}
            onAppointmentCreated={(newAppt) => {
              console.log('New appointment created:', newAppt);
            }}
          />

        </div>
      </Router>
    </AuthProvider>
  );
}