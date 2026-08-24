import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  Bot, 
  Calendar, 
  UserCheck, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  User, 
  HeartPulse 
} from 'lucide-react';

export default function Navbar({ onOpenBookModal }) {
  const { user, isAuthenticated, role, logout, switchDemoRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-medical-teal flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-700 via-brand-800 to-medical-teal bg-clip-text text-transparent">
                MediCare Plus
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                Healthcare Management Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-brand-50 text-brand-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Overview
            </Link>

            <Link
              to="/ai-assistant"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/ai-assistant')
                  ? 'bg-gradient-to-r from-purple-500/10 to-brand-500/10 text-purple-700 border border-purple-200 font-semibold'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-600" />
              <span>Ask AI</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-sm">
                Gemini
              </span>
            </Link>

            <Link
              to="/patient"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/patient')
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Calendar className="w-4 h-4 text-brand-600" />
              <span>Patient Portal</span>
            </Link>

            <Link
              to="/doctor"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/doctor')
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Doctor Portal</span>
            </Link>

            <Link
              to="/admin"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/admin')
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Center</span>
            </Link>
          </div>

          {/* Right Action: User Profile & Book Visit */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Book Appointment CTA */}
            {onOpenBookModal && (
              <button
                onClick={onOpenBookModal}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-500/20 transition-all hover:shadow-md"
              >
                + Book Visit
              </button>
            )}

            {/* Auth / Profile State */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden border border-slate-300 shadow-sm">
                    <img 
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'} 
                      alt="avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left leading-tight hidden xl:block">
                    <div className="text-xs font-bold text-slate-800">{user?.name || 'User'}</div>
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                      role === 'ADMIN' ? 'bg-amber-100 text-amber-800' :
                      role === 'DOCTOR' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-brand-100 text-brand-800'
                    }`}>
                      {role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenBookModal && (
              <button
                onClick={onOpenBookModal}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 text-white"
              >
                Book
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-slide-up">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Overview
          </Link>
          <Link
            to="/ai-assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-purple-700 bg-purple-50"
          >
            <span className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              Ask AI
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-600 text-white">
              Gemini
            </span>
          </Link>
          <Link
            to="/patient"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            <Calendar className="w-5 h-5 text-brand-600" />
            Patient Portal
          </Link>
          <Link
            to="/doctor"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            <UserCheck className="w-5 h-5 text-emerald-600" />
            Doctor Portal
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            Admin Center
          </Link>

          <div className="pt-4 border-t border-slate-200">
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                    <img 
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'} 
                      alt="avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{user?.name}</div>
                    <div className="text-[10px] font-bold text-brand-600 uppercase">{role}</div>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Account</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}