
import React, { useState } from 'react';
import { OnboardingData } from '../types';
import { User, Calendar, CheckCircle2, Circle } from 'lucide-react';

interface Props {
  onComplete: (data: OnboardingData) => void;
}

const NEEDS_OPTIONS = ["Manage Nanny", "Track Meds", "Find Activities", "Mental Peace", "Meal Planning"];

const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
  const [formData, setFormData] = useState<OnboardingData>({
    children: [
      { id: '1', name: '', dob: '', gender: 'boy', avatar: 'https://picsum.photos/seed/child/200/200' }
    ],
    needs: []
  });

  const updateChild = (fields: Partial<any>) => {
    setFormData({
      ...formData,
      children: [{ ...formData.children[0], ...fields }]
    });
  };

  const toggleNeed = (need: string) => {
    setFormData({
      ...formData,
      needs: formData.needs.includes(need) 
        ? formData.needs.filter(n => n !== need) 
        : [...formData.needs, need]
    });
  };

  const isFormValid = formData.children[0].name.trim() !== '' && formData.children[0].dob !== '';

  return (
    <div className="h-screen flex flex-col bg-[#FAF9F6] p-8 max-w-md mx-auto overflow-y-auto no-scrollbar">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[#264653] leading-none mb-2">LET'S SET UP YOUR HQ!</h1>
        <p className="text-slate-400 font-semibold text-sm">Every Alpha Parent needs a mission plan.</p>
      </header>

      <div className="space-y-6 flex-1">
        {/* Child Name Card */}
        <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm transition-all focus-within:border-[#2A9D8F]/30">
          <label className="block text-[10px] font-bold text-[#2A9D8F] uppercase mb-2 tracking-widest">Child's Name</label>
          <div className="relative">
            <User size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="e.g. Arya Mehta"
              className="w-full pl-8 py-2 text-lg font-bold outline-none text-[#264653] bg-transparent"
              value={formData.children[0].name}
              onChange={e => updateChild({ name: e.target.value })}
            />
          </div>
        </div>

        {/* Gender Select */}
        <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label className="block text-[10px] font-bold text-[#2A9D8F] uppercase mb-4 tracking-widest">Gender</label>
          <div className="flex gap-4">
            {(['boy', 'girl', 'other'] as const).map(g => (
              <button
                key={g}
                onClick={() => updateChild({ gender: g })}
                className={`flex-1 py-3 rounded-2xl font-bold text-xs uppercase transition-all ${
                  formData.children[0].gender === g 
                  ? 'bg-[#E76F51] text-white shadow-lg scale-105' 
                  : 'bg-slate-50 text-slate-400 border border-slate-100'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* DOB Card */}
        <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label className="block text-[10px] font-bold text-[#2A9D8F] uppercase mb-2 tracking-widest">Date of Birth</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="date" 
              className="w-full pl-8 py-2 text-lg font-bold outline-none text-[#264653] bg-transparent"
              value={formData.children[0].dob}
              onChange={e => updateChild({ dob: e.target.value })}
            />
          </div>
        </div>

        {/* How can we help? Chips */}
        <div>
          <label className="block text-[10px] font-bold text-[#2A9D8F] uppercase mb-4 tracking-widest pl-2">How can we help?</label>
          <div className="flex flex-wrap gap-2">
            {NEEDS_OPTIONS.map(need => (
              <button
                key={need}
                onClick={() => toggleNeed(need)}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  formData.needs.includes(need)
                  ? 'bg-[#2A9D8F] text-white'
                  : 'bg-white text-slate-500 border border-slate-200'
                }`}
              >
                {formData.needs.includes(need) ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                {need}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete(formData)}
        disabled={!isFormValid}
        className="mt-10 w-full py-5 bg-[#E9C46A] disabled:bg-slate-200 text-[#264653] font-bold rounded-[2rem] shadow-xl text-xl uppercase tracking-widest transition-all active:scale-95"
      >
        Let's Go!
      </button>
    </div>
  );
};

export default OnboardingScreen;
