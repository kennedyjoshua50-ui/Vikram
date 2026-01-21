
import React from 'react';
import { Phone, MessageSquare, ClipboardList, PlusCircle, MoreVertical, ShieldCheck } from 'lucide-react';
import { Staff } from '../types';

const STAFF: Staff[] = [
  { id: '1', name: 'Sunita Didi', role: 'Full-time Nanny', avatar: 'https://picsum.photos/seed/sunita/100/100', status: 'At Home' },
  { id: '2', name: 'Ramesh Singh', role: 'Driver', avatar: 'https://picsum.photos/seed/ramesh/100/100', status: 'On Duty' },
  { id: '3', name: 'Leela Devi', role: 'Night Nanny', avatar: 'https://picsum.photos/seed/leela/100/100', status: 'Off Duty' },
];

interface Props {
  isDarkMode: boolean;
}

const NannyScreen: React.FC<Props> = ({ isDarkMode }) => {
  const textColor = isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]';
  const cardBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white';

  return (
    <div className={`p-6 md:p-10 min-h-full transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'}`}>
      <header className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className={`text-3xl md:text-4xl font-bold heading-condensed ${textColor}`}>VILLAGE STAFF</h1>
          <p className="text-[#2A9D8F] font-bold text-xs uppercase tracking-widest">Manage Your Support Team</p>
        </div>
        <button className={`w-12 h-12 rounded-2xl shadow-sm border flex items-center justify-center hover:scale-105 active:scale-95 transition-all ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] text-[#2A9D8F]' : 'bg-white border-slate-100 text-[#2A9D8F]'}`}>
           <PlusCircle size={24} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STAFF.map((member) => (
          <div key={member.id} className={`${cardBg} border-2 rounded-[2.5rem] p-6 shadow-sm group hover:shadow-md transition-all`}>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden border-2 border-[#E9C46A] shadow-md group-hover:rotate-3 transition-transform">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                   <h3 className={`text-lg font-bold tracking-tight ${textColor}`}>{member.name}</h3>
                   <div className={`${member.status === 'Off Duty' ? 'bg-slate-50 text-slate-400' : 'bg-emerald-50 text-emerald-600'} px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1`}>
                      <div className={`w-1 h-1 rounded-full ${member.status === 'Off Duty' ? 'bg-slate-300' : 'bg-emerald-500'}`}></div>
                      {member.status}
                   </div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">{member.role}</p>
                <div className="flex items-center gap-1 text-[9px] font-bold text-[#2A9D8F]">
                   <ShieldCheck size={12} />
                   Verified Alpha Professional
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 bg-[#264653] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all">
                <Phone size={14} /> Call Now
              </button>
              <button className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 text-[#E2E2E2]' : 'bg-[#E9C46A]/20 text-[#264653]'}`}>
                <ClipboardList size={14} /> Tasks
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Sync Notice */}
      <div className="mt-12 bg-[#2A9D8F] rounded-[2.5rem] p-8 md:p-12 text-center shadow-lg shadow-[#2A9D8F]/20 relative overflow-hidden max-w-4xl mx-auto">
         <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full" />
         <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-black/5 rounded-full" />
         <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center text-white mb-4">
               <MessageSquare size={24} />
            </div>
            <h4 className="text-white text-2xl font-bold heading-condensed mb-2">WEEKLY MISSION SYNC</h4>
            <p className="text-white/70 text-sm font-bold leading-relaxed mb-6 px-4 md:max-w-md mx-auto">
               Brief 10-min meeting every Sunday morning to align the calendar and delegate upcoming responsibilities.
            </p>
            <button className="px-8 py-4 bg-white text-[#2A9D8F] text-[10px] font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all hover:px-10">
               Schedule Call
            </button>
         </div>
      </div>
    </div>
  );
};

export default NannyScreen;
