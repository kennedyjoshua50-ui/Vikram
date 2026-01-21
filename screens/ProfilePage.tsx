
import React from 'react';
import { ArrowLeft, User, ShieldCheck, Settings, LogOut, Users, Bell, Globe, Moon, ChevronRight } from 'lucide-react';

interface Props {
  onBack: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const ProfilePage: React.FC<Props> = ({ onBack, onLogout, isDarkMode, onToggleDarkMode }) => {
  const textColor = isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]';
  const subTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white';

  return (
    <div className={`min-h-screen p-6 animate-in slide-in-from-left duration-300 pb-12 transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'}`}>
      <header className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className={`p-2 rounded-xl shadow-sm border ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] text-white' : 'bg-white border-slate-50 text-[#264653]'}`}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={`text-2xl font-bold heading-condensed ${textColor}`}>MY ALPHA HQ</h1>
      </header>

      {/* Profile Card */}
      <div className={`${cardBg} rounded-[2.5rem] p-8 border-2 shadow-sm text-center mb-10`}>
        <div className="w-20 h-20 mx-auto rounded-[1.8rem] border-4 border-[#E9C46A] p-0.5 mb-4 rotate-2 overflow-hidden">
           <img src="https://picsum.photos/seed/parent/200/200" className="w-full h-full object-cover rounded-[1.5rem]" alt="Profile" />
        </div>
        <h2 className={`text-xl font-bold mb-1 ${textColor}`}>Sameer Mehta</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
           <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[8px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-slate-700">Single Parent</span>
           <div className="flex items-center gap-1 px-3 py-1 bg-[#2A9D8F]/10 rounded-full text-[8px] font-black text-[#2A9D8F] uppercase tracking-widest">
             <ShieldCheck size={10} /> Premium
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest pl-2">My Village</h3>
        <ProfileLink icon={<Users size={18} />} title="Manage Staff (Didi/Driver)" subtitle="3 Active Staff Members" isDarkMode={isDarkMode} />
        <ProfileLink icon={<Settings size={18} />} title="Child Profiles" subtitle="Manage Arya & Kabir" isDarkMode={isDarkMode} />
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest pl-2">Preferences</h3>
        <div className={`${cardBg} rounded-[2rem] border-2 overflow-hidden shadow-sm`}>
           <SettingsRow icon={<Bell size={16} />} title="Push Notifications" active isDarkMode={isDarkMode} />
           <SettingsRow icon={<Globe size={16} />} title="Language" value="English" isDarkMode={isDarkMode} />
           <SettingsRow 
            icon={<Moon size={16} />} 
            title="Dark Mode" 
            active={isDarkMode} 
            onToggle={onToggleDarkMode} 
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <button 
        onClick={onLogout}
        className={`mt-12 w-full py-4 font-black uppercase tracking-widest rounded-[1.2rem] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-sm ${isDarkMode ? 'bg-[#24272B] border-[#4A1D1D] text-rose-400 border-2' : 'bg-white border-rose-50 border-2 text-rose-500'}`}
      >
        <LogOut size={18} /> Logout HQ
      </button>
    </div>
  );
};

const ProfileLink = ({ icon, title, subtitle, isDarkMode }: { icon: React.ReactNode, title: string, subtitle: string, isDarkMode: boolean }) => (
  <button className={`w-full p-5 rounded-[2rem] border-2 shadow-sm flex items-center gap-4 transition-colors text-left ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] active:bg-[#2F3338]' : 'bg-white border-white active:bg-slate-50'}`}>
     <div className="w-10 h-10 bg-[#2A9D8F]/10 rounded-xl flex items-center justify-center text-[#2A9D8F]">
        {icon}
     </div>
     <div className="flex-1">
        <p className={`text-xs font-black uppercase ${isDarkMode ? 'text-white' : 'text-[#264653]'}`}>{title}</p>
        <p className="text-[9px] text-slate-500 font-bold">{subtitle}</p>
     </div>
     <ChevronRight size={16} className="text-slate-400 opacity-50" />
  </button>
);

const SettingsRow = ({ icon, title, active, value, onToggle, isDarkMode }: { icon: React.ReactNode, title: string, active?: boolean, value?: string, onToggle?: () => void, isDarkMode: boolean }) => (
  <div 
    onClick={onToggle}
    className={`flex items-center justify-between px-6 py-4 border-b last:border-0 cursor-pointer ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}
  >
     <div className="flex items-center gap-4">
        <div className="text-slate-400">{icon}</div>
        <span className={`text-[11px] font-bold ${isDarkMode ? 'text-white' : 'text-[#264653]'}`}>{title}</span>
     </div>
     {value && <span className="text-[10px] font-black text-[#2A9D8F] uppercase">{value}</span>}
     {active !== undefined && (
       <div className={`w-9 h-5 rounded-full relative transition-colors p-1 ${active ? 'bg-[#2A9D8F]' : 'bg-slate-300'}`}>
         <div className={`w-3 h-3 bg-white rounded-full transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`} />
       </div>
     )}
  </div>
);

export default ProfilePage;
