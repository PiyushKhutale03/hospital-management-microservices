import React from 'react';
import { HeartPulse, Shield, Phone, Mail, MapPin, Activity, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-medical-teal flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">MediCare Plus</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An enterprise-grade, microservices-driven healthcare platform unifying Patient EHR, Doctor Management, and Spring AI clinical triage.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-lg w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              All 5 Microservices Operational
            </div>
          </div>

          {/* Col 2: Clinical Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Clinical Specialties</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Advanced Cardiology</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Neuroscience & Spine Care</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Pediatrics & Neonatal Care</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Orthopedic Surgery</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Internal Medicine</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Spring AI Diagnostic Engine</li>
            </ul>
          </div>

          {/* Col 3: Microservice Architecture */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Architecture Stack</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                <span>Eureka Registry (Port 8761)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                <span>Spring Cloud Gateway (Port 8089)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                <span>Patient Service (Port 8084)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                <span>Doctor Service (Port 8082)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                <span>AI Service + Ollama (Port 8083)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Hotline */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Emergency Care</h4>
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Phone className="w-4 h-4" /> 24/7 Trauma Hotline
              </div>
              <div className="text-xl font-bold text-white tracking-wide">+1 (800) 911-CARE</div>
              <div className="text-xs text-rose-300/80">Immediate ICU ambulance dispatch</div>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> 742 Health Boulevard, Medical District
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> support@medicaremicroservices.io
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 MediCare Plus Platform. Built by Piyush Khutale with Spring Boot 3.5 & React.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">HIPAA Compliant</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-slate-400 cursor-pointer">OpenAPI Specs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}