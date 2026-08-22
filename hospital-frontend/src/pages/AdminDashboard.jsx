import React, { useState, useEffect } from 'react';
import { patientService, doctorService } from '../services/api';
import { MOCK_DOCTORS, MOCK_PATIENTS } from '../services/mockData';
import { 
  ShieldCheck, 
  UserPlus, 
  Users, 
  UserCheck, 
  Activity, 
  Search, 
  ArrowUpDown, 
  CheckCircle2, 
  Server, 
  Database, 
  Bot, 
  Layers,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  // Doctor onboarding form state
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocSpec, setNewDocSpec] = useState('Cardiology');
  const [newDocUserId, setNewDocUserId] = useState('');
  const [onboardSuccess, setOnboardSuccess] = useState(false);
  const [onboardLoading, setOnboardLoading] = useState(false);

  useEffect(() => {
    doctorService.getAllDoctors().then(docs => setDoctors(docs));
    patientService.getAllPatients(page, pageSize, sortBy, sortDir).then(data => setPatients(data));
  }, [page, pageSize, sortBy, sortDir]);

  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    if (!newDocName || !newDocSpec) return;

    setOnboardLoading(true);
    const payload = {
      name: newDocName,
      specialization: newDocSpec,
      userId: Number(newDocUserId) || Math.floor(Math.random() * 800) + 100
    };

    const res = await doctorService.onboardDoctor(payload);
    if (res.success) {
      setOnboardSuccess(true);
      setDoctors(prev => [res.data, ...prev]);
      setTimeout(() => {
        setShowOnboardModal(false);
        setOnboardSuccess(false);
        setNewDocName('');
        setNewDocUserId('');
      }, 1500);
    }
    setOnboardLoading(false);
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.bloodGroup && p.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 text-[11px] font-bold uppercase tracking-wider mb-1 border border-amber-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Admin Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hospital System Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Manage clinical credentials, onboard new doctors, and oversee paginated patient records.
          </p>
        </div>

        <button
          onClick={() => setShowOnboardModal(true)}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 hover:scale-105"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Onboard New Doctor</span>
        </button>
      </div>

      {/* Microservice Topology Health Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { name: 'Service Registry', port: '8761', status: 'Healthy', icon: Layers, color: 'text-brand-600' },
          { name: 'API Gateway', port: '8089', status: 'Healthy', icon: Server, color: 'text-purple-600' },
          { name: 'Patient Service', port: '8084', status: 'Healthy', icon: Database, color: 'text-emerald-600' },
          { name: 'Doctor Service', port: '8082', status: 'Healthy', icon: UserCheck, color: 'text-amber-600' },
          { name: 'Spring AI Service', port: '8083', status: 'Healthy', icon: Bot, color: 'text-pink-600' },
        ].map((svc, idx) => {
          const Icon = svc.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${svc.color}`} />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-xs font-bold text-slate-800">{svc.name}</div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Port {svc.port}</span>
                <span className="font-semibold text-emerald-600">{svc.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section: Patient Directory & Doctors Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Paginated Patient Directory (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-600" />
                Master Patient Directory
              </h2>
              <p className="text-xs text-slate-500">Paginated patient data from Patient Microservice (POST /admin/patients)</p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient or blood group..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Patients Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-3">Patient</th>
                  <th className="py-3 px-3">Blood Group</th>
                  <th className="py-3 px-3">Insurance Policy</th>
                  <th className="py-3 px-3">Coverage</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-400">{p.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-100 text-rose-700 font-bold">
                        {p.bloodGroup || 'O+'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      <div className="font-semibold text-slate-800">{p.insurance?.providerName || 'BlueCross'}</div>
                      <div className="font-mono text-[10px] text-slate-400">{p.insurance?.policyNumber || 'BC-99824'}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-600">
                      {p.insurance?.coverageAmount || '$50,000'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Active EHR
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
            <span>Showing {filteredPatients.length} patient records</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-slate-800">Page {page + 1}</span>
              <button
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right: Active Medical Staff (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hospital Physicians</h3>
              <p className="text-xs text-slate-500">{doctors.length} onboarded doctors</p>
            </div>
            <button
              onClick={() => setShowOnboardModal(true)}
              className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
              title="Add doctor"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {doctors.map((doc) => (
              <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {doc.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{doc.name}</div>
                  <div className="text-[11px] font-semibold text-brand-600 truncate">{doc.specialization}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Doctor Onboarding Modal */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Onboard New Medical Doctor</h3>
                <p className="text-xs text-slate-500">Calls Doctor Microservice /admin/onBoardNewDoctor</p>
              </div>
              <button
                onClick={() => setShowOnboardModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {onboardSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Doctor successfully onboarded into Doctor Service!</span>
              </div>
            )}

            <form onSubmit={handleOnboardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Doctor Full Name
                </label>
                <input
                  type="text"
                  placeholder="E.g., Dr. Jonathan Myers"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Specialization
                </label>
                <select
                  value={newDocSpec}
                  onChange={(e) => setNewDocSpec(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Emergency Care">Emergency Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assigned User ID in Patient DB
                </label>
                <input
                  type="number"
                  placeholder="E.g., 201"
                  value={newDocUserId}
                  onChange={(e) => setNewDocUserId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <span className="text-[10px] text-slate-400">Leaves blank to auto-generate mapping ID</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOnboardModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={onboardLoading}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md disabled:opacity-50"
                >
                  {onboardLoading ? 'Registering Doctor...' : 'Onboard Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}