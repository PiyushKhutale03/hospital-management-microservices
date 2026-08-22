export const MOCK_DEPARTMENTS = [
  { id: 1, name: 'Cardiology', icon: 'Heart', desc: 'Heart and cardiovascular care with modern diagnostic labs', doctorCount: 6 },
  { id: 2, name: 'Neurology', icon: 'Brain', desc: 'Comprehensive brain, nerve, and spine disorders center', doctorCount: 4 },
  { id: 3, name: 'Pediatrics', icon: 'Baby', desc: 'Specialized healthcare for infants, children, and adolescents', doctorCount: 8 },
  { id: 4, name: 'Orthopedics', icon: 'Bone', desc: 'Joint replacement, trauma care, and sports medicine', doctorCount: 5 },
  { id: 5, name: 'General Medicine', icon: 'Stethoscope', desc: 'Holistic preventative healthcare and acute disease management', doctorCount: 12 },
  { id: 6, name: 'Emergency & Trauma', icon: 'Ambulance', desc: '24/7 critical emergency response and intensive triage', doctorCount: 9 },
];

export const MOCK_DOCTORS = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    specialization: 'Cardiology',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 128,
    available: true,
    email: 'sarah.jenkins@medicare.org',
    phoneNumber: '+1 (555) 234-8901',
    hospital: 'Main Campus - Cardiology Block A',
    fee: '$120',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MD, FACC - Harvard Medical School',
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:15 PM'],
  },
  {
    id: 2,
    name: 'Dr. Robert Martinez',
    specialization: 'Neurology',
    experienceYears: 18,
    rating: 4.8,
    reviewsCount: 96,
    available: true,
    email: 'robert.martinez@medicare.org',
    phoneNumber: '+1 (555) 432-1098',
    hospital: 'Neuroscience Wing B',
    fee: '$150',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MD, PhD - Johns Hopkins University',
    availableSlots: ['11:00 AM', '01:30 PM', '03:30 PM'],
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialization: 'Pediatrics',
    experienceYears: 9,
    rating: 5.0,
    reviewsCount: 210,
    available: true,
    email: 'emily.chen@medicare.org',
    phoneNumber: '+1 (555) 876-5432',
    hospital: 'Children\'s Health Pavilion',
    fee: '$95',
    avatar: 'https://images.unsplash.com/photo-1594824813533-46955da5a32e?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MD, FAAP - Stanford University',
    availableSlots: ['08:30 AM', '10:00 AM', '11:45 AM', '02:30 PM'],
  },
  {
    id: 4,
    name: 'Dr. Marcus Vance',
    specialization: 'Orthopedics',
    experienceYears: 12,
    rating: 4.7,
    reviewsCount: 84,
    available: false,
    email: 'marcus.vance@medicare.org',
    phoneNumber: '+1 (555) 987-6543',
    hospital: 'Orthopedic & Joint Center',
    fee: '$130',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MS (Ortho), Fellowship in Joint Reconstruction',
    availableSlots: ['09:15 AM', '03:00 PM'],
  },
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    specialization: 'General Medicine',
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 175,
    available: true,
    email: 'priya.sharma@medicare.org',
    phoneNumber: '+1 (555) 345-6789',
    hospital: 'Family Health Clinic 3',
    fee: '$80',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300',
    qualifications: 'MD (Internal Medicine), AIIMS',
    availableSlots: ['09:00 AM', '11:00 AM', '01:00 PM', '04:00 PM'],
  },
];

export const MOCK_PATIENTS = [
  {
    id: 101,
    name: 'Alexander Ross',
    email: 'alex.ross@example.com',
    gender: 'Male',
    birthDate: '1988-04-12',
    bloodGroup: 'O_POSITIVE',
    phone: '+1 (555) 789-0123',
    createdAt: '2026-01-15T10:00:00',
    insurance: {
      providerName: 'BlueCross HealthCare',
      policyNumber: 'BC-9982410',
      validTill: '2027-12-31',
      coverageAmount: '$50,000'
    }
  },
  {
    id: 102,
    name: 'Sophia Williams',
    email: 'sophia.w@example.com',
    gender: 'Female',
    birthDate: '1995-09-24',
    bloodGroup: 'A_POSITIVE',
    phone: '+1 (555) 456-7890',
    createdAt: '2026-02-01T14:30:00',
    insurance: {
      providerName: 'United Medical Trust',
      policyNumber: 'UMT-542190',
      validTill: '2027-06-30',
      coverageAmount: '$100,000'
    }
  },
  {
    id: 103,
    name: 'David Miller',
    email: 'david.miller@example.com',
    gender: 'Male',
    birthDate: '1976-11-03',
    bloodGroup: 'B_POSITIVE',
    phone: '+1 (555) 234-5678',
    createdAt: '2026-02-10T09:15:00',
    insurance: {
      providerName: 'Aetna Global Health',
      policyNumber: 'AET-110293',
      validTill: '2026-11-30',
      coverageAmount: '$75,000'
    }
  },
  {
    id: 104,
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    gender: 'Female',
    birthDate: '2001-03-18',
    bloodGroup: 'AB_POSITIVE',
    phone: '+1 (555) 678-9012',
    createdAt: '2026-02-18T16:45:00',
    insurance: {
      providerName: 'Cigna Premier Plus',
      policyNumber: 'CG-887102',
      validTill: '2028-01-15',
      coverageAmount: '$120,000'
    }
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: 501,
    patientId: 101,
    patientName: 'Alexander Ross',
    doctorId: 1,
    doctorName: 'Dr. Sarah Jenkins',
    specialization: 'Cardiology',
    appointmentTime: '2026-08-25T10:30:00',
    symptoms: 'Mild chest discomfort and shortness of breath upon brisk walking.',
    status: 'CONFIRMED',
    notes: 'Please bring recent lipid panel test reports.',
  },
  {
    id: 502,
    patientId: 101,
    patientName: 'Alexander Ross',
    doctorId: 3,
    doctorName: 'Dr. Emily Chen',
    specialization: 'Pediatrics',
    appointmentTime: '2026-08-28T11:45:00',
    symptoms: 'Routine immunization consultation and general health checkup for toddler.',
    status: 'PENDING',
    notes: 'Vaccination chart required.',
  },
  {
    id: 503,
    patientId: 102,
    patientName: 'Sophia Williams',
    doctorId: 2,
    doctorName: 'Dr. Robert Martinez',
    specialization: 'Neurology',
    appointmentTime: '2026-08-23T14:00:00',
    symptoms: 'Chronic episodic migraine with visual aura lasting 4+ hours.',
    status: 'COMPLETED',
    notes: 'Prescribed prophylactic beta-blockers and sleep hygiene schedule.',
  },
  {
    id: 504,
    patientId: 103,
    patientName: 'David Miller',
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
• Top Matching Specialists: Dr. Sarah Jenkins (Cardiology), Dr. Priya Sharma (Internal Medicine).`,

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
• Immediate Action: Please call emergency services (911 / 112 / 108) or visit the nearest Hospital Emergency Room immediately.
• Do not drive yourself. Avoid heavy physical exertion while awaiting paramedic support.`;
    }
    return `ℹ️ Non-Critical Assessment:
Your symptoms do not immediately match typical acute emergencies, but continue monitoring. If symptoms suddenly worsen, seek emergency care.`;
  },

  diet: (condition) => `Medical Nutrition Plan for "${condition}":
• Foods to Prioritize: Leafy greens (spinach, kale), lean proteins, omega-3 rich fish, oats, berries, and 2.5L+ daily water intake.
• Foods to Restrict: Ultra-processed foods, high sodium items (>2000mg/day), refined sugars, and saturated trans-fats.
• Lifestyle Advice: 30 minutes of moderate aerobic walking daily and maintaining regular sleep intervals.`
};