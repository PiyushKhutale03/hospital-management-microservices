import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doctorService } from '../services/api';
import { MOCK_APPOINTMENTS } from '../services/mockData';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Activity, 
  Star, 
  Phone, 
  Mail,
  ToggleLeft,
  ToggleRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [available, setAvailable] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeNoteModal, setActiveNoteModal] = useState(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    doctorService.getDoctorAppointments().then(data => {
      setAppointments(MOCK_APPOINTMENTS);
    });
  }, []);

  const updateStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const saveNote = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, notes: noteText } : a));
    setActiveNoteModal(null);
    setNoteText('');
  };

  const filtered = appointments.filter(a => selectedStatus === 'ALL' || a.status === selectedStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Doctor Header Profile */}
      <div className="bg-gradient-to-r from-emerald-800 via-slate-900 to-brand-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md overflow-hidden border border-white/30 shrink-0">
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'} 
              alt="doctor" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[11px] font-bold uppercase tracking-wider mb-1 border border-emerald-400/30">
              Doctor Portal • Attending Physician
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {user?.name || 'Dr. Rajesh Sharma'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
              Specialization: <strong className="text-white">{user?.specialization || 'Cardiology & Heart Health'}</strong> • Apollo Main Campus
            </p>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
          <span className="text-xs font-bold text-white px-2">
            Status: {available ? 'Accepting Patients' : 'On Leave / Break'}
          </span>
          <button
            onClick={() => setAvailable(!available)}
            className={`p-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1 ${
              available ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {available ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today's Appointments</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{appointments.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-brand-50 text-brand-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Approvals</div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {appointments.filter(a => a.status === 'PENDING').length}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Visits</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {appointments.filter(a => a.status === 'COMPLETED').length}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Appointment Queue Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Patient Consultation Queue</h2>
            <p className="text-xs text-slate-500 mt-0.5">Review reported symptoms, update consultation status, and attach clinical instructions.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedStatus === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((appt) => (
            <div
              key={appt.id}
              className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-emerald-200 transition-all shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                    {appt.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{appt.patientName}</h4>
                    <p className="text-xs text-slate-500">Patient ID: #{appt.patientId || 101} • Ref Appt #{appt.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                    appt.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    appt.status === 'PENDING' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {appt.status}
                  </span>

                  {appt.status === 'PENDING' && (
                    <button
                      onClick={() => updateStatus(appt.id, 'CONFIRMED')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Confirm
                    </button>
                  )}

                  {appt.status === 'CONFIRMED' && (
                    <button
                      onClick={() => updateStatus(appt.id, 'COMPLETED')}
                      className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Mark Completed
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setActiveNoteModal(appt.id);
                      setNoteText(appt.notes || '');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Clinical Notes
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900">Reported Symptoms:</div>
                <div className="italic text-slate-600">"{appt.symptoms}"</div>
              </div>

              {appt.notes && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900">
                  <strong>Attached Clinical Advice:</strong> {appt.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Note Modal */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Add Clinical Instructions & Rx</h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter prescription instructions, recommended lab tests, or follow-up schedule..."
              rows={4}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveNoteModal(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => saveNote(activeNoteModal)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}