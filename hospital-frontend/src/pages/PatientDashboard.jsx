import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { patientService, doctorService } from '../services/api';
import { MOCK_APPOINTMENTS } from '../services/mockData';
import { 
  Calendar, 
  Clock, 
  Shield, 
  FileText, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Phone, 
  Droplet,
  Bot,
  Sparkles,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PatientDashboard({ onOpenBookModal, onSelectDoctorForBooking }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      patientService.getProfile(),
      doctorService.getDoctorAppointments()
    ]).then(([prof, appts]) => {
      setProfile(prof);
      setAppointments(MOCK_APPOINTMENTS);
      setLoading(false);
    });
  }, []);

  const filteredAppointments = appointments.filter(a => {
    if (filter === 'ALL') return true;
    return a.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Patient Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-800 to-medical-teal rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md overflow-hidden border border-white/30 shrink-0">
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
              alt="user" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider mb-1">
              Patient Portal • ID #{user?.id || 101}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || 'Alexander Ross'}
            </h1>
            <p className="text-xs sm:text-sm text-brand-100 mt-0.5">
              Manage your healthcare visits, insurance coverage, and digital prescriptions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onOpenBookModal}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Appointment</span>
          </button>
          
          <Link
            to="/ai-assistant"
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4" />
            <span>AI Triage</span>
          </Link>
        </div>
      </div>

      {/* Profile & Health Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Medical Demographics */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Health Demographics</span>
            <Droplet className="w-4 h-4 text-rose-500" />
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Blood Group:</span>
              <span className="font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                {profile?.bloodGroup || 'O+ (Positive)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Date of Birth:</span>
              <span className="font-semibold text-slate-800">{profile?.birthDate || 'April 12, 1988'}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Gender:</span>
              <span className="font-semibold text-slate-800">{profile?.gender || 'Male'}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Primary Contact:</span>
              <span className="font-semibold text-slate-800">{profile?.phone || '+1 (555) 789-0123'}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Insurance Coverage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Insurance Policy</span>
            <Shield className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Provider:</span>
              <span className="font-bold text-slate-800">{profile?.insurance?.providerName || 'BlueCross Health'}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Policy Number:</span>
              <span className="font-mono text-xs font-semibold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded">
                {profile?.insurance?.policyNumber || 'BC-9982410'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Coverage Limit:</span>
              <span className="font-extrabold text-emerald-600">{profile?.insurance?.coverageAmount || '$50,000'}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Valid Till:</span>
              <span className="font-semibold text-slate-800">{profile?.insurance?.validTill || 'Dec 31, 2027'}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Quick Ask AI Health Summary */}
        <div className="bg-gradient-to-br from-purple-50 to-brand-50 rounded-2xl p-5 border border-purple-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-purple-700 uppercase tracking-wider">
            <span>Ask AI Assistant</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xs text-purple-950/80 leading-relaxed">
            Have a new symptom or questions about your medication dosage? Get automated triage in seconds before your doctor consultation.
          </p>
          <Link
            to="/ai-assistant"
            className="block text-center py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Launch Ask AI →
          </Link>
        </div>

      </div>

      {/* Appointments Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Your Consultations & Visits</h2>
            <p className="text-xs text-slate-500 mt-0.5">Track confirmed appointments, status updates, and diagnostic notes.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === st 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Calendar className="w-10 h-10 mx-auto text-slate-300" />
              <div className="text-sm font-semibold">No appointments found under this filter.</div>
              <button
                onClick={onOpenBookModal}
                className="mt-2 text-xs font-bold text-brand-600 hover:underline"
              >
                Schedule an appointment now →
              </button>
            </div>
          ) : (
            filteredAppointments.map((appt) => (
              <div
                key={appt.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-brand-200 transition-all shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
                      #{appt.id}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{appt.doctorName}</h4>
                      <div className="text-xs text-brand-600 font-semibold">{appt.specialization || 'Clinical Specialist'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      appt.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      appt.status === 'PENDING' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      Scheduled Time: <strong className="text-slate-800">{new Date(appt.appointmentTime).toLocaleDateString()} at {new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Symptoms: <em className="text-slate-700 font-medium">"{appt.symptoms}"</em></span>
                  </div>
                </div>

                {appt.notes && (
                  <div className="p-2.5 rounded-xl bg-brand-50/70 border border-brand-100 text-[11px] text-brand-900">
                    <strong>Doctor Instructions:</strong> {appt.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}