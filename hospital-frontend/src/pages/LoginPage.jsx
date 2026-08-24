import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HeartPulse, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  UserCheck, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
  const { login, register, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('PATIENT');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all required credentials.');
      return;
    }

    setLoading(true);
    setError(null);

    if (isSignUp) {
      const res = await register({
        username,
        password,
        name: name || username.split('@')[0],
        roles: [role]
      });
      if (res.success) {
        navigate(role === 'ADMIN' ? '/admin' : role === 'DOCTOR' ? '/doctor' : '/patient');
      } else {
        setError('Registration failed. Please check your credentials.');
      }
    } else {
      const res = await login(username, password);
      if (res.success) {
        navigate(res.user.role === 'ADMIN' ? '/admin' : res.user.role === 'DOCTOR' ? '/doctor' : '/patient');
      } else {
        setError('Login failed. Invalid email or password.');
      }
    }
    setLoading(false);
  };

  const handleQuickLogin = (roleType) => {
    switchDemoRole(roleType);
    if (roleType === 'ADMIN') navigate('/admin');
    else if (roleType === 'DOCTOR') navigate('/doctor');
    else navigate('/patient');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-medical-teal items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <HeartPulse className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isSignUp ? 'Create MediCare Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-500">
            {isSignUp 
              ? 'Register with Patient Service authentication endpoint' 
              : 'Sign in to access your appointments, medical records, and AI triage'}
          </p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
          
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { setIsSignUp(false); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                !isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              New Registration
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['PATIENT', 'DOCTOR', 'ADMIN'].map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setRole(r)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all text-center ${
                          role === r ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Deshmukh"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="rahul.deshmukh@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : isSignUp ? 'Create Account' : 'Sign In to Portal'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Verified System Accounts Box */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Authorized System Accounts (Click to Fill)
              </span>
              <span className="text-[10px] font-semibold text-brand-600">Autofills Form</span>
            </div>

            <div className="space-y-2">
              {/* Admin Card */}
              <button
                type="button"
                onClick={() => {
                  setUsername('admin@medicareplus.in');
                  setPassword('Admin@123');
                  setIsSignUp(false);
                  setError(null);
                }}
                className="w-full p-2.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      Chief Administrator <span className="px-1.5 py-0.2 rounded bg-amber-200/70 text-amber-900 text-[10px] font-bold">ADMIN</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">admin@medicareplus.in • Pass: Admin@123</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Doctor Card */}
              <button
                type="button"
                onClick={() => {
                  setUsername('dr.rajesh@medicare.in');
                  setPassword('Doctor@123');
                  setIsSignUp(false);
                  setError(null);
                }}
                className="w-full p-2.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      Dr. Rajesh Sharma <span className="px-1.5 py-0.2 rounded bg-emerald-200/70 text-emerald-900 text-[10px] font-bold">DOCTOR</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">dr.rajesh@medicare.in • Pass: Doctor@123</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Patient Card */}
              <button
                type="button"
                onClick={() => {
                  setUsername('rahul.deshmukh@gmail.com');
                  setPassword('Patient@123');
                  setIsSignUp(false);
                  setError(null);
                }}
                className="w-full p-2.5 rounded-2xl bg-brand-50/70 hover:bg-brand-100/70 border border-brand-200 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      Rahul Deshmukh <span className="px-1.5 py-0.2 rounded bg-brand-200/70 text-brand-900 text-[10px] font-bold">PATIENT</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">rahul.deshmukh@gmail.com • Pass: Patient@123</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}