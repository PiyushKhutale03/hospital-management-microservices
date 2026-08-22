import React, { useState, useEffect } from 'react';
import { patientService, doctorService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { X, Calendar, Clock, User, Stethoscope, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AppointmentModal({ isOpen, onClose, selectedDoctorId, onAppointmentCreated }) {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(selectedDoctorId || '');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      doctorService.getAllDoctors().then(docs => {
        setDoctors(docs);
        if (selectedDoctorId) {
          setDoctorId(selectedDoctorId);
        } else if (docs.length > 0) {
          setDoctorId(docs[0].id);
        }
      });
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
      setSlot('10:30 AM');
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  }, [isOpen, selectedDoctorId]);

  if (!isOpen) return null;

  const currentDoctor = doctors.find(d => String(d.id) === String(doctorId)) || doctors[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId || !date || !slot) {
      setErrorMessage('Please select a doctor, appointment date, and time slot.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const appointmentIso = `${date}T${slot.includes('PM') && !slot.startsWith('12') ? (parseInt(slot.split(':')[0]) + 12) : slot.split(':')[0].padStart(2, '0')}:${slot.split(':')[1].replace(/\s[AP]M/, '')}:00`;

    const payload = {
      patientId: user?.id || 101,
      doctorId: Number(doctorId),
      appointmentTime: appointmentIso,
      reason: reason || 'General clinical consultation',
      name: user?.name || 'Alexander Ross'
    };

    try {
      const res = await patientService.createAppointment(payload);
      if (res.success) {
        setSuccessMessage('Appointment confirmed successfully!');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onAppointmentCreated) {
          onAppointmentCreated(res.data);
        }
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        setErrorMessage('Failed to schedule appointment. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Service error occurred while booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        <div className="bg-gradient-to-r from-brand-700 to-brand-600 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-200" />
              Schedule Doctor Appointment
            </h3>
            <p className="text-xs text-brand-100 mt-0.5">
              Select your specialist physician, preferred date, and consultation slot.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Attending Physician
            </label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialization} ({doc.hospital || 'MediCare Main'})
                </option>
              ))}
            </select>
          </div>

          {currentDoctor && (
            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-200 overflow-hidden border border-brand-300 shrink-0">
                <img 
                  src={currentDoctor.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150'} 
                  alt="doc" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-800">{currentDoctor.name}</div>
                <div className="text-brand-700 font-medium">{currentDoctor.specialization} • Consultation Fee: {currentDoctor.fee || '$100'}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Appointment Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Time Slot
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="09:00 AM">09:00 AM (Morning)</option>
                <option value="10:30 AM">10:30 AM (Morning)</option>
                <option value="11:45 AM">11:45 AM (Late Morning)</option>
                <option value="02:00 PM">02:00 PM (Afternoon)</option>
                <option value="03:30 PM">03:30 PM (Evening)</option>
                <option value="04:45 PM">04:45 PM (Evening)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Primary Symptoms / Consultation Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="E.g., Persistent tension headache for 3 days with mild light sensitivity..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Confirming...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Confirm & Book Appointment</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}