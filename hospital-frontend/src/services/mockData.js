export const MOCK_DEPARTMENTS = [
  { id: 1, name: 'Cardiology', icon: 'Heart', desc: 'Advanced heart & cardiovascular care with modern ECG and Cath Labs', doctorCount: 6 },
  { id: 2, name: 'Neurology', icon: 'Brain', desc: 'Comprehensive brain, nerve, and spine disorders center', doctorCount: 4 },
  { id: 3, name: 'Pediatrics', icon: 'Baby', desc: 'Specialized healthcare for infants, children, and adolescents', doctorCount: 8 },
  { id: 4, name: 'Orthopedics', icon: 'Bone', desc: 'Joint replacement, trauma care, and sports rehabilitation', doctorCount: 5 },
  { id: 5, name: 'General Medicine', icon: 'Stethoscope', desc: 'Holistic preventative healthcare and acute disease management', doctorCount: 12 },
  { id: 6, name: 'Emergency & Trauma', icon: 'Ambulance', desc: '24/7 critical emergency response and intensive triage', doctorCount: 9 },
];

export const MOCK_DOCTORS = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    specialization: 'Cardiology',
    experienceYears: 15,
    rating: 4.9,
    reviewsCount: 142,
    available: true,
    email: 'rajesh.sharma@medicare.in',
    phoneNumber: '+91 98234 56789',
    hospital: 'Apollo Hospital - Cardiology Block A',
    fee: '₹1,200',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MBBS, MD, DM (Cardiology) - AIIMS New Delhi',
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:15 PM'],
  },
  {
    id: 2,
    name: 'Dr. Ananya Iyer',
    specialization: 'Neurology',
    experienceYears: 18,
    rating: 4.8,
    reviewsCount: 98,
    available: true,
    email: 'ananya.iyer@medicare.in',
    phoneNumber: '+91 98112 34567',
    hospital: 'Fortis Memorial - Neuro Center',
    fee: '₹1,500',
    avatar: 'https://images.unsplash.com/photo-1594824813533-46955da5a32e?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MBBS, MD, M.Ch (Neuro) - NIMHANS Bengaluru',
    availableSlots: ['11:00 AM', '01:30 PM', '03:30 PM'],
  },
  {
    id: 3,
    name: 'Dr. Rohan Kulkarni',
    specialization: 'Pediatrics',
    experienceYears: 9,
    rating: 5.0,
    reviewsCount: 220,
    available: true,
    email: 'rohan.kulkarni@medicare.in',
    phoneNumber: '+91 98765 43210',
    hospital: 'Apollo Children’s Pavilion',
    fee: '₹800',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MBBS, DNB (Pediatrics) - KEM Hospital Mumbai',
    availableSlots: ['08:30 AM', '10:00 AM', '11:45 AM', '02:30 PM'],
  },
  {
    id: 4,
    name: 'Dr. Vikram Malhotra',
    specialization: 'Orthopedics',
    experienceYears: 12,
    rating: 4.7,
    reviewsCount: 89,
    available: false,
    email: 'vikram.malhotra@medicare.in',
    phoneNumber: '+91 99201 23456',
    hospital: 'Max Super Specialty Hospital',
    fee: '₹1,100',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MS (Ortho), Fellowship in Joint Reconstruction - Manipal Hospital',
    availableSlots: ['09:15 AM', '03:00 PM'],
  },
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    specialization: 'General Medicine',
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 185,
    available: true,
    email: 'priya.sharma@medicare.in',
    phoneNumber: '+91 98334 56789',
    hospital: 'MediCare Health Clinic, Pune',
    fee: '₹700',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MBBS, MD (Internal Medicine) - AIIMS Delhi',
    availableSlots: ['09:00 AM', '11:00 AM', '01:00 PM', '04:00 PM'],
  },
];

export const MOCK_PATIENTS = [
  {
    id: 101,
    name: 'Rahul Deshmukh',
    email: 'rahul.deshmukh@gmail.com',
    gender: 'Male',
    birthDate: '1992-04-12',
    bloodGroup: 'O_POSITIVE',
    phone: '+91 98200 11223',
    createdAt: '2026-01-15T10:00:00',
    insurance: {
      providerName: 'Star Health Insurance',
      policyNumber: 'STAR-9982410',
      validTill: 'Dec 31, 2027',
      coverageAmount: '₹5,00,000'
    }
  },
  {
    id: 102,
    name: 'Pooja Patel',
    email: 'pooja.patel@gmail.com',
    gender: 'Female',
    birthDate: '1996-09-24',
    bloodGroup: 'A_POSITIVE',
    phone: '+91 98450 22334',
    createdAt: '2026-02-01T14:30:00',
    insurance: {
      providerName: 'HDFC ERGO Health',
      policyNumber: 'HE-542190',
      validTill: 'Jun 30, 2027',
      coverageAmount: '₹10,00,000'
    }
  },
  {
    id: 103,
    name: 'Amit Verma',
    email: 'amit.verma@gmail.com',
    gender: 'Male',
    birthDate: '1984-11-03',
    bloodGroup: 'B_POSITIVE',
    phone: '+91 98710 33445',
    createdAt: '2026-02-10T09:15:00',
    insurance: {
      providerName: 'ICICI Lombard Complete Health',
      policyNumber: 'ICICI-110293',
      validTill: 'Nov 30, 2026',
      coverageAmount: '₹7,50,000'
    }
  },
  {
    id: 104,
    name: 'Sneha Joshi',
    email: 'sneha.joshi@gmail.com',
    gender: 'Female',
    birthDate: '2000-03-18',
    bloodGroup: 'AB_POSITIVE',
    phone: '+91 98900 44556',
    createdAt: '2026-02-18T16:45:00',
    insurance: {
      providerName: 'Care Health Insurance',
      policyNumber: 'CARE-887102',
      validTill: 'Jan 15, 2028',
      coverageAmount: '₹12,00,000'
    }
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: 501,
    patientId: 101,
    patientName: 'Rahul Deshmukh',
    doctorId: 1,
    doctorName: 'Dr. Rajesh Sharma',
    specialization: 'Cardiology',
    appointmentTime: '2026-08-25T10:30:00',
    symptoms: 'Mild chest discomfort and shortness of breath upon brisk walking.',
    status: 'CONFIRMED',
    notes: 'Please bring recent lipid profile & ECG test reports.',
  },
  {
    id: 502,
    patientId: 101,
    patientName: 'Rahul Deshmukh',
    doctorId: 3,
    doctorName: 'Dr. Rohan Kulkarni',
    specialization: 'Pediatrics',
    appointmentTime: '2026-08-28T11:45:00',
    symptoms: 'Routine immunization consultation and general health checkup.',
    status: 'PENDING',
    notes: 'Vaccination chart required.',
  },
  {
    id: 503,
    patientId: 102,
    patientName: 'Pooja Patel',
    doctorId: 2,
    doctorName: 'Dr. Ananya Iyer',
    specialization: 'Neurology',
    appointmentTime: '2026-08-23T14:00:00',
    symptoms: 'Chronic episodic migraine with visual aura lasting 4+ hours.',
    status: 'COMPLETED',
    notes: 'Prescribed prophylactic therapy and sleep hygiene schedule.',
  },
  {
    id: 504,
    patientId: 103,
    patientName: 'Amit Verma',
    doctorId: 5,
    doctorName: 'Dr. Priya Sharma',
    specialization: 'General Medicine',
    appointmentTime: '2026-08-26T09:00:00',
    symptoms: 'Persistent dry cough, mild seasonal fatigue, and low-grade evening fever.',
    status: 'CONFIRMED',
    notes: 'CBC and Chest X-Ray recommended.',
  }
];

export const MOCK_AI_RESPONSES = {
  symptoms: (symptoms) => `Based on your symptoms ("${symptoms}"):
• Possible Indications: Tension headache, seasonal allergies, or early viral infection.
• Recommended Specialist: General Physician / Internal Medicine.
• Next Steps: Maintain hydration, monitor temperature, and seek a clinical evaluation if fever exceeds 101°F (38.3°C).
• Note: This is an automated preliminary assessment and not a definitive diagnosis.`,

  doctor: (condition) => `For condition "${condition}":
• Recommended Specialty: Cardiology / Internal Medicine Specialist.
• Why: Specialists in this department have advanced imaging (Echocardiogram, ECG, Holter monitors) to evaluate symptoms accurately.
• Top Matching Specialists: Dr. Rajesh Sharma (Cardiology), Dr. Priya Sharma (Internal Medicine).`,

  medicine: (medicine) => `Medication Profile for "${medicine}":
• Primary Uses: Pain relief, fever reduction, anti-inflammatory.
• Standard Adult Dosage: Follow prescribing doctor instructions (typically 500mg-650mg every 6-8 hrs as needed).
• Common Precautions: Take with food/milk to prevent gastrointestinal discomfort. Avoid alcohol during therapy.
• Contraindications: Kidney or liver disease patients should consult their physician before use.`,

  interaction: (medicines) => `Interaction Analysis for [${medicines}]:
• Safety Verdict: ⚠️ Moderate Caution Advised.
• Interaction Mechanism: Concurrent administration may increase risk of gastric irritation or altered drug metabolism.
• Clinical Recommendation: Take with a gap of 2 hours between doses and consult your prescribing pharmacist.`,

  emergency: (symptoms) => {
    const isCritical = /chest pain|breath|stroke|unconscious|bleed|numbness/i.test(symptoms);
    if (isCritical) {
      return `🚨 URGENT MEDICAL ATTENTION REQUIRED:
Your symptoms ("${symptoms}") indicate potential signs of a severe or critical health condition.
• Immediate Action: Please call emergency ambulance services (108 / 112 / 102) or visit the nearest Hospital Emergency Room immediately.
• Do not drive yourself. Avoid heavy physical exertion while awaiting paramedic support.`;
    }
    return `ℹ️ Non-Critical Assessment:
Your symptoms do not immediately match typical acute emergencies, but continue monitoring. If symptoms suddenly worsen, seek emergency care.`;
  },

  diet: (condition) => `Medical Nutrition Plan for "${condition}":
• Foods to Prioritize: Dal, leafy greens (palak, methi), paneer, lean protein, oats, sprouts, and 2.5L+ daily water intake.
• Foods to Restrict: Ultra-processed foods, high sodium items (>2000mg/day), refined sugars, and saturated trans-fats.
• Lifestyle Advice: 30 minutes of moderate aerobic walking daily and maintaining regular sleep intervals.`
};