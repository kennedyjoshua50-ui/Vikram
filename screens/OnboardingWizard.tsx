
import React, { useState } from 'react';
import { OnboardingData, Child } from '../types';
import { User, Calendar, CheckCircle2, Circle, ChevronRight, ChevronLeft, Baby, Minus, Plus } from 'lucide-react';

interface Props {
  onComplete: (data: OnboardingData) => void;
  isDarkMode: boolean;
}

const NEEDS_OPTIONS = ["Nanny Mgmt", "Health Tracking", "Mental Peace", "Meal Planning", "Activities"];

const OnboardingWizard: React.FC<Props> = ({ onComplete, isDarkMode }) => {
  const [step, setStep] = useState(0);
  const [childCount, setChildCount] = useState(1);
  const [needs, setNeeds] = useState<string[]>([]);
  const [children, setChildren] = useState<Child[]>([
    { id: '1', name: '', dob: '', gender: 'boy', avatar: 'https://picsum.photos/seed/child1/200/200' }
  ]);

  const textColor = isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]';
  const cardBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-slate-100';
  const inputBg = isDarkMode ? 'bg-slate-800' : 'bg-slate-50';

  const updateChild = (index: number, fields: Partial<Child>) => {
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], ...fields };
    setChildren(newChildren);
  };

  const handleChildCountChange = (delta: number) => {
    const newCount = Math.max(1, Math.min(4, childCount + delta));
    setChildCount(newCount);
    
    if (newCount > children.length) {
      const added = Array.from({ length: newCount - children.length }).map((_, i) => ({
        id: (children.length + i + 1).toString(),
        name: '',
        dob: '',
        gender: 'boy' as const,
        avatar: `https://picsum.photos/seed/child${children.length + i + 1}/200/200`
      }));
      setChildren([...children, ...added]);
    } else {
      setChildren(children.slice(0, newCount));
    }
  };

  const toggleNeed = (need: string) => {
    setNeeds(prev => prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]);
  };

  const isStepValid = () => {
    if (step === 0) return true;
    if (step === 1) return children.every(c => c.name.trim() !== '' && c.dob !== '');
    if (step === 2) return needs.length > 0;
    return false;
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else onComplete({ children, needs });
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className={`h-screen flex flex-col transition-colors duration-300 max-w-md mx-auto overflow-hidden ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'}`}>
      <div className={`px-8 pt-12 pb-6 rounded-b-[3rem] shadow-sm ${isDarkMode ? 'bg-[#24272B]' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#2A9D8F]' : 'w-2 bg-slate-200'}`} />
            ))}
          </div>
          <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#264653]'}`}>Step {step + 1} of 3</span>
        </div>
        <h1 className={`text-3xl font-bold heading-condensed ${isDarkMode ? 'text-white' : 'text-[#264653]'}`}>LET'S SET UP YOUR HQ!</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar relative p-8">
        {step === 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-300">
            <div className="w-16 h-16 bg-[#E9C46A] rounded-[1.2rem] flex items-center justify-center rotate-3 shadow-lg">
              <Baby size={32} className="text-[#264653]" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-2 heading-condensed ${textColor}`}>How many little superstars are we managing?</h2>
              <p className="text-xs font-semibold text-slate-500 mb-6 italic">"We'll create a dedicated space for each one."</p>
              
              <div className={`flex items-center justify-center gap-6 p-6 rounded-[2.5rem] border-2 shadow-sm ${cardBg}`}>
                <button onClick={() => handleChildCountChange(-1)} className={`w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 text-[#264653]'}`}>
                  <Minus size={20} />
                </button>
                <span className={`text-5xl font-black ${textColor}`}>{childCount}</span>
                <button onClick={() => handleChildCountChange(1)} className="w-10 h-10 bg-[#2A9D8F] text-white rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-300">
            <h2 className={`text-2xl font-bold heading-condensed ${textColor}`}>The Details</h2>
            
            <div className="space-y-8">
              {children.map((child, idx) => (
                <div key={child.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#E9C46A]/20 flex items-center justify-center text-[#E9C46A] font-black text-[10px]">
                      {idx + 1}
                    </div>
                    <span className="text-[9px] font-black text-[#2A9D8F] uppercase tracking-widest">Child {idx + 1}</span>
                  </div>
                  
                  <div className={`p-5 rounded-[2rem] border-2 shadow-sm ${cardBg}`}>
                    <label className="block text-[9px] font-black text-[#2A9D8F] uppercase mb-1 tracking-widest">Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Arya"
                      className={`w-full py-1 text-base font-bold outline-none bg-transparent ${textColor}`}
                      value={child.name}
                      onChange={e => updateChild(idx, { name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-[1.5rem] border-2 shadow-sm ${cardBg}`}>
                      <label className="block text-[8px] font-black text-[#2A9D8F] uppercase mb-1">Birthday</label>
                      <input 
                        type="date" 
                        className={`w-full text-xs font-bold outline-none bg-transparent ${textColor}`}
                        value={child.dob}
                        onChange={e => updateChild(idx, { dob: e.target.value })}
                      />
                    </div>
                    <div className={`flex gap-1 p-1 rounded-[1.5rem] ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      {(['boy', 'girl'] as const).map(g => (
                        <button
                          key={g}
                          onClick={() => updateChild(idx, { gender: g })}
                          className={`flex-1 py-1.5 rounded-xl text-[8px] font-black uppercase transition-all ${
                            child.gender === g 
                              ? (isDarkMode ? 'bg-slate-700 text-[#2A9D8F] shadow-sm' : 'bg-white text-[#2A9D8F] shadow-sm') 
                              : 'text-slate-500'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-300">
            <h2 className={`text-2xl font-bold heading-condensed ${textColor}`}>How can we be your village?</h2>
            
            <div className="flex flex-wrap gap-3">
              {NEEDS_OPTIONS.map(need => (
                <button
                  key={need}
                  onClick={() => toggleNeed(need)}
                  className={`px-5 py-3 rounded-full text-[10px] font-black transition-all flex items-center gap-2 border-2 ${
                    needs.includes(need)
                    ? 'bg-[#2A9D8F] text-white shadow-md border-[#2A9D8F]'
                    : isDarkMode 
                      ? 'bg-[#24272B] text-slate-500 border-[#2F3338]' 
                      : 'bg-white text-slate-500 border-slate-100'
                  }`}
                >
                  {needs.includes(need) ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                  {need}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-8 flex gap-4">
        {step > 0 && (
          <button
            onClick={handleBack}
            className={`flex-1 py-3 border-2 font-bold rounded-[1.2rem] shadow-sm text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] text-white' : 'bg-white border-slate-100 text-[#264653]'}`}
          >
            <ChevronLeft size={20} />
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`${step > 0 ? 'flex-[2]' : 'w-full'} py-3 bg-[#E9C46A] disabled:bg-slate-300 text-[#264653] font-bold rounded-[1.2rem] shadow-lg text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2`}
        >
          {step === 2 ? "Let's Go!" : "Next"}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default OnboardingWizard;
