import React, { useState } from 'react';
import { 
  Bot, 
  Stethoscope, 
  Pill, 
  AlertTriangle, 
  Utensils, 
  Sparkles, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  Info,
  Clock
} from 'lucide-react';
import { aiAssistantService } from '../services/api';

export default function AiAssistantPage() {
  const [activeTab, setActiveTab] = useState('symptoms');
  const [inputQuery, setInputQuery] = useState('');
  const [secondaryQuery, setSecondaryQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const TABS = [
    { id: 'symptoms', label: 'Symptom Checker', icon: Stethoscope, color: 'text-purple-600', desc: 'Preliminary triage for symptoms and possible conditions' },
    { id: 'doctor', label: 'Doctor Recommender', icon: Bot, color: 'text-brand-600', desc: 'Find the exact clinical specialist for your health condition' },
    { id: 'medicine', label: 'Drug Info & Interactions', icon: Pill, color: 'text-emerald-600', desc: 'Explore drug uses, side effects, and check 2+ medications for dangerous interactions' },
    { id: 'emergency', label: 'Emergency Triage', icon: AlertTriangle, color: 'text-rose-600', desc: 'Identify critical symptoms requiring urgent ER hospital care' },
    { id: 'diet', label: 'Diet & Nutrition', icon: Utensils, color: 'text-amber-600', desc: 'Personalized evidence-based nutrition plans for health conditions' },
  ];

  const PRESETS = {
    symptoms: [
      "Severe throbbing headache on right side with nausea and sensitivity to bright light",
      "Persistent dry cough, mild evening fever 100F, and general fatigue for 4 days",
      "Sharp pain in right lower abdomen when walking or bending",
    ],
    doctor: [
      "Frequent chest palpitations during light exercise and high blood pressure",
      "Skin rash with red itchy patches spreading on forearms",
      "Severe joint stiffness in knees in the morning with swelling",
    ],
    medicine: [
      "Amoxicillin 500mg",
      "Metformin 1000mg",
      "Aspirin 81mg and Ibuprofen 400mg",
    ],
    emergency: [
      "Sudden crushing chest pain radiating to left arm and cold sweating",
      "Mild seasonal sneezing and runny nose with clear fluid",
      "Sudden weakness and numbness in left side of face and slurred speech",
    ],
    diet: [
      "Type 2 Diabetes with elevated HbA1c 7.8%",
      "Hypertension and Stage 2 High Blood Pressure (145/95)",
      "High uric acid with mild gout flare-ups",
    ]
  };

  const handleAnalyze = async (overrideQuery, overrideSecondary) => {
    const q = overrideQuery !== undefined ? overrideQuery : inputQuery;
    const q2 = overrideSecondary !== undefined ? overrideSecondary : secondaryQuery;

    if (!q.trim()) return;

    setLoading(true);
    setResponse(null);

    let resText = '';
    try {
      if (activeTab === 'symptoms') {
        resText = await aiAssistantService.checkSymptoms(q);
      } else if (activeTab === 'doctor') {
        resText = await aiAssistantService.recommendDoctor(q);
      } else if (activeTab === 'medicine') {
        if (q2.trim() || q.includes('and') || q.includes(',')) {
          const combined = q2.trim() ? `${q} and ${q2}` : q;
          resText = await aiAssistantService.checkMedicineInteraction(combined);
        } else {
          resText = await aiAssistantService.getMedicineInfo(q);
        }
      } else if (activeTab === 'emergency') {
        resText = await aiAssistantService.checkEmergency(q);
      } else if (activeTab === 'diet') {
        resText = await aiAssistantService.getDietAdvice(q);
      }

      setResponse(resText);
      setHistory(prev => [{
        id: Date.now(),
        tab: activeTab,
        query: q,
        response: resText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }, ...prev.slice(0, 4)]);
    } catch (err) {
      setResponse("AI Microservice is currently initializing or unreachable. Please verify Spring AI / Ollama service connection.");
    } finally {
      setLoading(false);
    }
  };

  const currentTabObj = TABS.find(t => t.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-brand-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Spring AI Diagnostic Suite
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI Clinical Assistant & Triage Engine
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Interact with our dedicated Spring AI microservice powered by local LLM inference for preliminary symptom assessment, drug interaction screening, and emergency risk triage.
          </p>
        </div>
      </div>

      {/* Main Grid: Tabs + Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Tab Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Clinical Tools
          </div>
          <div className="space-y-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setInputQuery('');
                    setSecondaryQuery('');
                    setResponse(null);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-500/20'
                      : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                      {tab.label}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Microservice Disclaimer Notice */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Info className="w-4 h-4 text-amber-600" />
              Medical Disclaimer
            </div>
            <p className="text-[11px] text-amber-800/80 leading-relaxed">
              This AI tool provides clinical decision support and preliminary informational assessment. Always consult a certified medical practitioner for definitive clinical diagnoses.
            </p>
          </div>
        </div>

        {/* Right: Interactive Console */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Active tool header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  {currentTabObj && <currentTabObj.icon className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{currentTabObj?.label}</h3>
                  <p className="text-xs text-slate-500">{currentTabObj?.desc}</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                POST /ai/{activeTab === 'doctor' ? 'doctor-recommend' : activeTab === 'medicine' ? 'medicine-info' : activeTab === 'emergency' ? 'emergency-check' : activeTab === 'diet' ? 'diet-advice' : 'symptom-check'}
              </span>
            </div>

            {/* Quick Test Prompt Pills */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Quick Sample Cases (Click to Test)
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESETS[activeTab]?.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputQuery(preset);
                      handleAnalyze(preset);
                    }}
                    className="text-left text-xs bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 hover:border-purple-200 px-3 py-1.5 rounded-xl transition-all"
                  >
                    "{preset.length > 50 ? preset.slice(0, 50) + '...' : preset}"
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {activeTab === 'symptoms' && 'Describe Patient Symptoms'}
                  {activeTab === 'doctor' && 'Enter Health Condition or Suspected Ailment'}
                  {activeTab === 'medicine' && 'Primary Medication Name'}
                  {activeTab === 'emergency' && 'Describe Critical or Acute Complaints'}
                  {activeTab === 'diet' && 'Health Condition / Metabolic State'}
                </label>
                <textarea
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={
                    activeTab === 'symptoms' ? 'E.g., Throbbing pain in temples, photophobia, mild nausea...' :
                    activeTab === 'doctor' ? 'E.g., Heart flutter, high blood pressure, shortness of breath...' :
                    activeTab === 'medicine' ? 'E.g., Ibuprofen 400mg' :
                    activeTab === 'emergency' ? 'E.g., Crushing central chest tightness and sweating...' :
                    'E.g., Type 2 Diabetes with high morning glucose'
                  }
                  rows={activeTab === 'medicine' ? 2 : 3}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
                />
              </div>

              {/* Secondary Input for Drug Interaction */}
              {activeTab === 'medicine' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Second Medication to Compare (Optional Interaction Check)
                  </label>
                  <input
                    type="text"
                    value={secondaryQuery}
                    onChange={(e) => setSecondaryQuery(e.target.value)}
                    placeholder="E.g., Aspirin 81mg or Blood Thinners"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setInputQuery('');
                    setSecondaryQuery('');
                    setResponse(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>

                <button
                  onClick={() => handleAnalyze()}
                  disabled={loading || !inputQuery.trim()}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Consulting AI Engine...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Run Clinical Analysis</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Output Card */}
            {response && (
              <div className={`p-6 rounded-2xl border animate-fade-in ${
                response.includes('🚨') 
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-gradient-to-br from-purple-50/70 to-brand-50/70 border-purple-200 text-slate-800'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-purple-200/60 mb-4">
                  <div className="flex items-center gap-2">
                    <Bot className={`w-5 h-5 ${response.includes('🚨') ? 'text-rose-600' : 'text-purple-600'}`} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {response.includes('🚨') ? 'Emergency Alert Detected' : 'AI Clinical Evaluation'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Generated just now</span>
                </div>

                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium space-y-2">
                  {response}
                </div>
              </div>
            )}

          </div>

          {/* Recent Consultation History */}
          {history.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Recent Diagnostic Logs
              </div>
              <div className="space-y-2">
                {history.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                    <div className="space-y-0.5 max-w-lg">
                      <div className="font-bold text-slate-800 capitalize">
                        {item.tab} Query: "{item.query}"
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {item.response.split('\n')[0]}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}