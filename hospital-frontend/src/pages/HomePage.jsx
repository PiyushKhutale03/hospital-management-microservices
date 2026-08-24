import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Calendar, 
  ShieldCheck, 
  HeartPulse, 
  ArrowRight, 
  Star, 
  CheckCircle, 
  Sparkles, 
  PhoneCall, 
  Clock, 
  Users, 
  Activity,
  Stethoscope,
  Brain,
  Baby,
  Bone,
  Ambulance,
  Heart
} from 'lucide-react';
import { MOCK_DEPARTMENTS } from '../services/mockData';
import { doctorService } from '../services/api';

export default function HomePage({ onOpenBookModal, onSelectDoctorForBooking }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    doctorService.getAllDoctors().then(docs => setDoctors(docs));
  }, []);

  const filteredDoctors = selectedDept === 'All' 
    ? doctors 
    : doctors.filter(d => d.specialization === selectedDept);

  const getDeptIcon = (iconName) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-6 h-6 text-rose-500" />;
      case 'Brain': return <Brain className="w-6 h-6 text-purple-500" />;
      case 'Baby': return <Baby className="w-6 h-6 text-amber-500" />;
      case 'Bone': return <Bone className="w-6 h-6 text-blue-500" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-emerald-500" />;
      case 'Ambulance': return <Ambulance className="w-6 h-6 text-red-500" />;
      default: return <Activity className="w-6 h-6 text-brand-500" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-brand-50/70 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/70 text-brand-800 text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-600 animate-spin" style={{ animationDuration: '6s' }} />
                Ask AI & Smart Healthcare Cloud
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Modern Healthcare, <br />
                <span className="bg-gradient-to-r from-brand-600 via-brand-700 to-medical-teal bg-clip-text text-transparent">
                  Intelligently Connected.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Seamlessly schedule appointments with board-certified physicians, explore intelligent AI symptom triage, and access unified health records.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onOpenBookModal}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Book an Appointment</span>
                </button>

                <Link
                  to="/ai-assistant"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 font-bold text-sm border border-purple-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span>Ask AI Health Assistant</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold border-t border-slate-200/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Stateless JWT Auth</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Verified Specialists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Ask AI Clinical Triage</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Card Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100/80">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                      <HeartPulse className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Hospital Cloud Live</div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> System Online & Connected
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>

                {/* Quick AI Preview Box */}
                <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-purple-50/50 to-brand-50 border border-purple-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                    <span className="flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-purple-600" /> AI Clinical Assessment
                    </span>
                    <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full">Ask AI</span>
                  </div>
                  <p className="text-xs text-purple-950/80 leading-relaxed italic">
                    "Patient reports sudden migraine aura and mild light sensitivity. Evaluating possible tension vs migraine cluster..."
                  </p>
                  <Link 
                    to="/ai-assistant"
                    className="block text-center text-xs font-bold text-purple-700 hover:text-purple-800 bg-white py-2 rounded-xl border border-purple-200 shadow-sm"
                  >
                    Open Ask AI Chat →
                  </Link>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xl font-extrabold text-slate-800">24/7</div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase">Care Services</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xl font-extrabold text-brand-600">99.9%</div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase">System Uptime</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Clinical Specialties Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600">Specialized Centers</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">World-Class Clinical Departments</h3>
          <p className="text-sm text-slate-500">
            Dedicated hospital wings staffed with board-certified physicians, trauma surgeons, and advanced diagnostic labs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_DEPARTMENTS.map((dept) => (
            <div 
              key={dept.id} 
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm glass-card-hover group cursor-pointer"
              onClick={() => setSelectedDept(dept.name)}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getDeptIcon(dept.icon)}
              </div>
              <h4 className="text-lg font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                {dept.name}
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {dept.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{dept.doctorCount} Specialists Available</span>
                <span className="text-brand-600 font-semibold group-hover:translate-x-1 transition-transform">View →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Doctors Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600">Medical Directory</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Consult with Leading Doctors</h3>
            <p className="text-sm text-slate-500 mt-1">Book in-person or telemedicine consultations with direct slot confirmation.</p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Cardiology', 'Neurology', 'Pediatrics', 'General Medicine'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  selectedDept === dept 
                    ? 'bg-brand-600 text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm glass-card-hover flex flex-col justify-between">
              
              <div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                    <img 
                      src={doctor.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{doctor.rating || '4.9'} ({doctor.reviewsCount || 45})</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{doctor.name}</h4>
                    <p className="text-xs font-semibold text-brand-600">{doctor.specialization}</p>
                    <p className="text-[11px] text-slate-400">{doctor.qualifications || 'Board Certified Physician'}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>Experience:</span>
                    <strong className="text-slate-700">{doctor.experienceYears || 10}+ Years</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Consultation Fee:</span>
                    <strong className="text-slate-900 font-bold">{doctor.fee || '₹800'}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <span className={`text-[11px] font-bold ${doctor.available !== false ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {doctor.available !== false ? '● Available Today' : '○ Off-Duty'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onSelectDoctorForBooking) onSelectDoctorForBooking(doctor.id);
                  if (onOpenBookModal) onOpenBookModal();
                }}
                className="mt-5 w-full py-2.5 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>

            </div>
          ))}
        </div>
      </section>

      {/* 4. Ask AI Health Assistant Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-brand-950 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-400/30">
              <Bot className="w-4 h-4 text-purple-400" /> Ask AI Clinical Intelligence
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              Clinical Intelligence At Your Fingertips
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Empowered by Gemini AI, Ask AI offers 6 core clinical aids: symptom assessment, physician specialty matching, medication profiles, drug interaction checking, emergency triage, and personalized diet advice.
            </p>
            <div className="pt-2">
              <Link
                to="/ai-assistant"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-900/50 transition-all hover:scale-105"
              >
                <span>Ask AI Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}