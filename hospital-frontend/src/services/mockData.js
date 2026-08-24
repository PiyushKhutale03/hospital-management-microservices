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
  symptoms: (symptoms = '') => {
    const q = symptoms.toLowerCase();
    if (q.includes('leg') || q.includes('knee') || q.includes('bone') || q.includes('joint') || q.includes('walk') || q.includes('ankle') || q.includes('thigh') || q.includes('calf') || q.includes('feet') || q.includes('foot')) {
      return `Based on your symptoms ("${symptoms}"):
• Possible Indications: Muscle strain, ligament sprain, sciatica, peripheral neuropathy, or localized joint inflammation.
• Severity Assessment: Moderate (Evaluate if swelling, inability to bear weight, or numbness is present).
• Recommended Specialist: Orthopedics / Joint & Spine Specialist (e.g. Dr. Vikram Malhotra).
• Immediate Advice: Apply R.I.C.E protocol (Rest, Ice for 15-20 min, Compression, Elevation), avoid high-impact exertion, and consult an orthopedic physician if pain persists for >48 hours.`;
    }
    if (q.includes('stomach') || q.includes('abdomen') || q.includes('digest') || q.includes('nausea') || q.includes('vomit') || q.includes('acidity') || q.includes('gastric') || q.includes('belly') || q.includes('cramp') || q.includes('gut')) {
      return `Based on your symptoms ("${symptoms}"):
• Possible Indications: Acute gastritis, gastroenteritis, acid reflux (GERD), food intolerance, or irritable bowel flare.
• Severity Assessment: Mild to Moderate (Seek immediate attention if severe localized lower-right pain, persistent vomiting, or high fever occurs).
• Recommended Specialist: Gastroenterologist / General Physician (e.g. Dr. Priya Sharma).
• Immediate Advice: Sip oral rehydration fluids (ORS), eat bland foods (khichdi, bananas, toast), avoid spicy/greasy meals, and get evaluated if symptoms intensify.`;
    }
    if (q.includes('head') || q.includes('migraine') || q.includes('dizzy') || q.includes('vertigo') || q.includes('vision') || q.includes('brain')) {
      return `Based on your symptoms ("${symptoms}"):
• Possible Indications: Tension headache, episodic migraine, cervical strain, or dehydration.
• Severity Assessment: Moderate (Red flags: sudden 'thunderclap' headache, visual loss, or speech difficulty).
• Recommended Specialist: Neurologist / Neuro-Physician (e.g. Dr. Ananya Iyer).
• Immediate Advice: Rest in a dark, quiet room, stay well-hydrated, avoid screen glare, and take prescribed mild analgesics if approved by your doctor.`;
    }
    if (q.includes('chest') || q.includes('heart') || q.includes('breath') || q.includes('palpitation')) {
      return `🚨 URGENT CLINICAL ASSESSMENT:
Based on your symptoms ("${symptoms}"):
• Possible Indications: Angina pectoris, cardiovascular strain, severe asthma/bronchospasm, or acute anxiety.
• Severity Assessment: High / Critical.
• Recommended Specialist: Cardiologist / Pulmonologist (e.g. Dr. Rajesh Sharma).
• Immediate Action: Do not exert physically. If accompanied by radiating arm/jaw pain or sweating, call 108 / 112 emergency ambulance immediately.`;
    }
    if (q.includes('cough') || q.includes('fever') || q.includes('cold') || q.includes('throat') || q.includes('flu')) {
      return `Based on your symptoms ("${symptoms}"):
• Possible Indications: Acute viral upper respiratory tract infection, seasonal flu, or pharyngitis.
• Severity Assessment: Mild (Monitor temperature and oxygen saturation).
• Recommended Specialist: General Physician / Internal Medicine (e.g. Dr. Priya Sharma).
• Immediate Advice: Steam inhalation twice daily, warm saline gargles, adequate hydration (2.5L+ warm fluids), and paracetamol for fever control as clinically advised.`;
    }
    return `Based on your symptoms ("${symptoms}"):
• Possible Indications: Localized somatic symptom, muscular fatigue, or mild acute inflammation.
• Severity Assessment: Mild to Moderate.
• Recommended Specialist: General Physician / Internal Medicine (e.g. Dr. Priya Sharma).
• Next Steps: Monitor symptom progression over 24-48 hours, ensure rest and hydration, and book an in-person clinical evaluation if discomfort continues.
• Note: Automated clinical decision support; not a substitute for formal diagnosis.`;
  },

  doctor: (condition = '') => {
    const q = condition.toLowerCase();
    if (q.includes('heart') || q.includes('cardio') || q.includes('bp') || q.includes('pressure') || q.includes('chest')) {
      return `For condition "${condition}":
• Recommended Specialty: Cardiology / Cardiovascular Medicine.
• Primary Diagnostic Tests: 12-Lead ECG, 2D Echocardiography, Lipid Profile, TMT (Treadmill Test).
• Top Matching Specialists: Dr. Rajesh Sharma (AIIMS New Delhi, Apollo Hospital).`;
    }
    if (q.includes('neuro') || q.includes('brain') || q.includes('nerve') || q.includes('migraine') || q.includes('spine') || q.includes('paralysis')) {
      return `For condition "${condition}":
• Recommended Specialty: Neurology & Neurosurgery.
• Primary Diagnostic Tests: Brain MRI / CT Scan, EEG, Nerve Conduction Study (NCS).
• Top Matching Specialists: Dr. Ananya Iyer (NIMHANS Bengaluru, Fortis Neuro Center).`;
    }
    if (q.includes('bone') || q.includes('joint') || q.includes('fracture') || q.includes('knee') || q.includes('leg') || q.includes('back')) {
      return `For condition "${condition}":
• Recommended Specialty: Orthopedics & Joint Reconstruction.
• Primary Diagnostic Tests: Digital X-Ray, Bone Mineral Density (DEXA), Joint Ultrasound / MRI.
• Top Matching Specialists: Dr. Vikram Malhotra (Manipal Hospital, Max Super Specialty).`;
    }
    if (q.includes('child') || q.includes('baby') || q.includes('pediatric') || q.includes('infant') || q.includes('kid')) {
      return `For condition "${condition}":
• Recommended Specialty: Pediatrics & Child Healthcare.
• Top Matching Specialists: Dr. Rohan Kulkarni (KEM Hospital Mumbai, Apollo Children's Pavilion).`;
    }
    return `For condition "${condition}":
• Recommended Specialty: Internal Medicine / General Physician.
• Why: A comprehensive physician evaluates systemic symptoms, orders baseline pathology (CBC, LFT, KFT), and coordinates specialist referrals if required.
• Top Matching Specialists: Dr. Priya Sharma (AIIMS Delhi, MediCare Clinic).`;
  },

  medicine: (medicine = '') => {
    const q = medicine.toLowerCase();
    if (q.includes('paracetamol') || q.includes('dolo') || q.includes('crocin')) {
      return `Clinical Medication Profile for "${medicine}":
• Generic Name: Paracetamol / Acetaminophen (Antipyretic & Analgesic).
• Primary Uses: Relief of mild to moderate pain (headaches, muscular aches) and fever reduction.
• Standard Adult Dosage: 500mg – 650mg every 4 to 6 hours as needed (Maximum 3000mg/day to protect liver).
• Precautions: Avoid alcohol during therapy. Patients with liver impairment must consult their doctor before use.`;
    }
    if (q.includes('metformin') || q.includes('sugar') || q.includes('glycomet')) {
      return `Clinical Medication Profile for "${medicine}":
• Generic Name: Metformin Hydrochloride (Biguanide Antidiabetic).
• Primary Uses: Management of Type 2 Diabetes Mellitus to improve insulin sensitivity and glycemic control.
• Administration: Take with or immediately after meals to reduce gastrointestinal upset.
• Precautions: Regular kidney function (eGFR/Creatinine) monitoring required. Avoid high alcohol intake.`;
    }
    if (q.includes('pantoprazole') || q.includes('pan') || q.includes('omeprazole') || q.includes('rabeprazole')) {
      return `Clinical Medication Profile for "${medicine}":
• Generic Name: Proton Pump Inhibitor (PPI).
• Primary Uses: Gastroesophageal Reflux Disease (GERD), gastric acidity, peptic ulcer prevention.
• Administration: Best taken once daily in the morning, 30 to 45 minutes before breakfast with water.`;
    }
    return `Medication Profile for "${medicine}":
• Primary Classification: Prescribed Therapeutic Pharmaceutical / Supplement.
• Primary Uses: Disease management, symptom alleviation, and metabolic regulation under medical supervision.
• Standard Guidance: Take strictly as prescribed by your treating physician. Do not alter dosage without consultation.
• Common Precautions: Take with water/food to minimize gastric discomfort; check for allergic reactions.`;
  },

  interaction: (medicines = '') => {
    return `Interaction & Safety Screening for [${medicines}]:
• Analysis: Evaluated drug-to-drug metabolic pathways (CYP450 enzymes, renal clearance, and gastric absorption).
• Clinical Recommendation: Maintain a minimum 1 to 2 hour interval between medications unless explicitly co-prescribed.
• Safety Notice: Always notify your doctor or pharmacist of all concurrent OTC medications and herbal supplements.`;
  },

  emergency: (symptoms = '') => {
    const isCritical = /chest|breath|stroke|unconscious|bleed|numb|paraly|chok|seizure|heart/i.test(symptoms);
    if (isCritical) {
      return `🚨 URGENT MEDICAL EMERGENCY (RED ALERT):
Your reported symptoms ("${symptoms}") match clinical criteria for potential high-acuity emergencies.
• Immediate Action: Call 108 / 112 emergency ambulance services or proceed immediately to the nearest Hospital Emergency Room.
• Critical Instructions: Do not drive yourself. Keep the patient in a comfortable seated or recovery position while waiting for paramedics.`;
    }
    return `ℹ️ Non-Critical Triage Assessment:
Your symptoms ("${symptoms}") do not immediately indicate acute life-threatening trauma, but require close monitoring.
• Recommendation: Schedule an in-person outpatient consultation with a physician. If severe pain, high fever, or breathing difficulty develops, seek emergency care immediately.`;
  },

  diet: (condition = '') => {
    const q = condition.toLowerCase();
    if (q.includes('egg') || q.includes('protein')) {
      return `Nutritional Breakdown & Dietary Profile for "${condition}":
• Protein Content in Eggs:
  - 1 Large Whole Boiled Egg (50g): ~6.3 grams of complete protein (all 9 essential amino acids).
  - Egg White (Albumin): ~3.6 grams protein, 0g fat, high bio-availability.
  - Egg Yolk: ~2.7 grams protein, healthy fats, Choline, Vitamin B12, Vitamin D, Lutein.
• Health Benefits: Supports muscle synthesis, brain health, eye vision protection, and satiety for weight management.
• Recommended Intake: 1-3 whole eggs daily for healthy active adults; consult a dietitian for specific cholesterol goals.`;
    }
    if (q.includes('sugar') || q.includes('diabet')) {
      return `Medical Nutrition Plan for Diabetes / Blood Sugar Control:
• Foods to Prioritize: Methi (fenugreek) seeds, bitter gourd (karela), whole dal, paneer, leafy greens (palak, methi), oats, and high-fiber millets (ragi, jowar).
• Foods to Restrict: Refined sugar, white rice, sweetened beverages, fruit juices, and maida products.
• Routine: Small frequent meals and a 15-minute post-meal brisk walk to stabilize glucose spikes.`;
    }
    if (q.includes('bp') || q.includes('hypertension') || q.includes('pressure')) {
      return `Medical Nutrition Plan for High Blood Pressure (DASH Protocol):
• Foods to Prioritize: Potassium-rich fruits (banana, pomegranate), garlic, steamed vegetables, coconut water, flax seeds, and unsalted nuts.
• Foods to Avoid: High-sodium pickles, papads, packaged chips, processed meats, and excess caffeine.
• Target Sodium: Restrict daily salt intake to under 1 teaspoon (<2,300mg sodium) per day.`;
    }
    return `Clinical Nutrition & Diet Plan for "${condition}":
• Foods to Prioritize: High-fiber legumes, seasonal green vegetables, lean proteins, sprouts, whole grains, and 2.5L+ daily water.
• Foods to Restrict: Ultra-processed items, deep-fried snacks, excess refined sugars, and high-sodium packaged foods.
• Lifestyle Advice: Pair balanced nutrition with 30 minutes of moderate aerobic exercise and 7-8 hours of sleep.`;
  }
};