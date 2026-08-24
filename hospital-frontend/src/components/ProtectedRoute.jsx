import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, Lock, ArrowRight, Sparkles, UserCheck, ShieldCheck } from "lucide-react";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, token, switchDemoRole } = useAuth();
  const location = useLocation();

  // 1. Check if user has an active JWT session
  if (!isAuthenticated || !token || !user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              401 Unauthorized Session
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
              Authentication Required
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              This portal is secured with JWT Token validation. Please sign in with an authorized user account to proceed.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to="/login"
              state={{ from: location }}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">or 1-Click Role Login</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => switchDemoRole("PATIENT")}
                className="py-2 text-[11px] font-bold rounded-xl border border-slate-200 hover:bg-brand-50 hover:border-brand-300 text-slate-700 transition-colors"
              >
                Patient
              </button>
              <button
                onClick={() => switchDemoRole("DOCTOR")}
                className="py-2 text-[11px] font-bold rounded-xl border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 transition-colors"
              >
                Doctor
              </button>
              <button
                onClick={() => switchDemoRole("ADMIN")}
                className="py-2 text-[11px] font-bold rounded-xl border border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-700 transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Check Role-Based Access Control (RBAC)
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const requiredRole = allowedRoles[0];
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-amber-200/80 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-wider border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> 403 Forbidden • RBAC Protected
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
              Access Denied: {allowedRoles.join(" / ")} Role Required
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are currently authenticated as <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono">{user.name} ({user.role})</strong>.
              This resource requires elevated <strong className="text-amber-800 uppercase">{allowedRoles.join(", ")}</strong> privileges.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
            <div className="font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-600" />
              Role-Based Access Control (RBAC) Security Policy:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-500 text-[11px]">
              <li>Only authenticated <strong>{allowedRoles.join(", ")}</strong> accounts can access this portal.</li>
              <li>Patients and guests are strictly barred from modifying medical staff and administrative records.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => switchDemoRole(requiredRole)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Switch to {requiredRole} Account</span>
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Return to Overview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
