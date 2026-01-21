
import React from 'react';
import { ArrowLeft, TrendingUp, Activity, Brain, Moon, Scale, Ruler } from 'lucide-react';
import { Child } from '../types';

interface Props {
  onBack: () => void;
  isDarkMode: boolean;
  child: Child;
}

const InsightsPage: React.FC<Props> = ({ onBack, isDarkMode, child }) => {
  const textColor = isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]';
  const cardBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white';
  const subTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`min-h-screen p-6 md:p-10 animate-in slide-in-from-right duration-300 pb-20 ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'}`}>
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className={`p-2 md:hidden rounded-xl shadow-sm border ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] text-white' : 'bg-white border-slate-50 text-[#264653]'}`}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={`text-2xl md:text-3xl font-bold heading-condensed ${textColor}`}>ALPHA INSIGHTS</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Summary & Metrics */}
        <div className="lg:col-span-1 space-y-6">
          {/* Child Summary Card */}
          <div className={`${cardBg} rounded-[2.5rem] p-6 border-2 shadow-sm flex items-center gap-5`}>
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#E9C46A] rotate-2">
               <img src={child?.avatar || "https://picsum.photos/seed/child/200/200"} alt="Child" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${textColor}`}>{child?.name || "The Little Alpha"}</h2>
              <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest">Growth Phase: Toddler</p>
            </div>
          </div>

          {/* Growth Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`${cardBg} p-5 rounded-[2rem] border-2 shadow-sm`}>
              <div className="flex items-center gap-2 mb-3 text-[#2A9D8F]">
                <Scale size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Weight</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-black ${textColor}`}>14.2</span>
                <span className={`text-xs font-bold ${subTextColor}`}>kg</span>
              </div>
              <p className="text-[9px] text-emerald-500 font-bold mt-1">+0.4kg since Dec</p>
            </div>
            <div className={`${cardBg} p-5 rounded-[2rem] border-2 shadow-sm`}>
              <div className="flex items-center gap-2 mb-3 text-[#E76F51]">
                <Ruler size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Height</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-black ${textColor}`}>92.4</span>
                <span className={`text-xs font-bold ${subTextColor}`}>cm</span>
              </div>
              <p className="text-[9px] text-emerald-500 font-bold mt-1">+1.2cm since Oct</p>
            </div>
          </div>

          <div className="bg-[#264653] p-8 rounded-[2.5rem] relative overflow-hidden text-center shadow-lg hidden lg:block">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16" />
            <h4 className="text-white text-lg font-bold heading-condensed mb-2">FULL ALPHA REPORT</h4>
            <p className="text-white/60 text-[10px] font-bold mb-6 px-4 uppercase tracking-widest">Generate a 12-page PDF for your pediatrician.</p>
            <button className="w-full py-3 bg-[#E9C46A] text-[#264653] text-[10px] font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all">
                GENERATE PDF
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Insights Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightSection 
              icon={<Brain className="text-[#2A9D8F]" />} 
              title="COGNITIVE DEVELOPMENT" 
              value="Advanced" 
              description="Recognition of shapes and primary colors is 15% ahead of age baseline. Solving 12-piece puzzles independently."
              isDarkMode={isDarkMode}
              percent={85}
            />
            <InsightSection 
              icon={<Moon className="text-indigo-400" />} 
              title="SLEEP QUALITY" 
              value="Optimal" 
              description="Consistent 10.5h sleep cycle established. REM phase looks stable with minimal night awakenings."
              isDarkMode={isDarkMode}
              percent={92}
            />
            <InsightSection 
              icon={<Activity className="text-rose-400" />} 
              title="PHYSICAL AGILITY" 
              value="Steady" 
              description="Motor skills for independent eating are developing well. Climbing stairs with minimal assistance."
              isDarkMode={isDarkMode}
              percent={70}
            />
            <InsightSection 
              icon={<TrendingUp className="text-amber-500" />} 
              title="SOCIAL SKILLS" 
              value="Developing" 
              description="Beginning to engage in parallel play. Sharing behaviors are emerging during park sessions."
              isDarkMode={isDarkMode}
              percent={60}
            />
          </div>

          {/* Monthly Report Promo for Mobile/Tablet portrait */}
          <div className="lg:hidden bg-[#264653] p-8 rounded-[2.5rem] relative overflow-hidden text-center shadow-lg">
             <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16" />
             <h4 className="text-white text-lg font-bold heading-condensed mb-2">FULL ALPHA REPORT</h4>
             <p className="text-white/60 text-[10px] font-bold mb-6 px-4 uppercase tracking-widest">Generate a 12-page PDF for your pediatrician.</p>
             <button className="px-6 py-3 bg-[#E9C46A] text-[#264653] text-[10px] font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all">
                GENERATE PDF
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightSection = ({ icon, title, value, description, isDarkMode, percent }: { icon: React.ReactNode, title: string, value: string, description: string, isDarkMode: boolean, percent: number }) => (
  <div className={`${isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white'} p-6 rounded-[2.2rem] border-2 shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-50/10 rounded-xl flex items-center justify-center">
           {icon}
        </div>
        <div>
          <h4 className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{title}</h4>
          <p className={`text-base font-bold ${isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]'}`}>{value}</p>
        </div>
      </div>
      <span className="text-xl font-black text-[#2A9D8F]">{percent}%</span>
    </div>
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
      <div className="h-full bg-[#2A9D8F] rounded-full transition-all duration-1000" style={{ width: `${percent}%` }} />
    </div>
    <p className={`text-[11px] leading-relaxed font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>
  </div>
);

export default InsightsPage;
