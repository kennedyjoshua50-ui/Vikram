
import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, MessageSquare, MoreVertical } from 'lucide-react';
import { Notification } from '../types';

const NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'completed', title: 'Task Completed', message: 'Sunita Didi gave evening medicine to Arya.', timestamp: '10m ago', group: 'Today' },
  { id: '2', type: 'alert', title: 'Alert', message: 'Flu vaccination for Kabir is overdue by 2 days.', timestamp: '2h ago', group: 'Today' },
  { id: '3', type: 'community', title: 'Community', message: 'Nisha replied to your post about Preschools.', timestamp: 'Yesterday', group: 'Yesterday' },
];

interface Props {
  onBack: () => void;
  isDarkMode: boolean;
}

const NotificationPage: React.FC<Props> = ({ onBack, isDarkMode }) => {
  const grouped = {
    Today: NOTIFICATIONS.filter(n => n.group === 'Today'),
    Yesterday: NOTIFICATIONS.filter(n => n.group === 'Yesterday')
  };

  const textColor = isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]';
  const cardBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white';

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'}`}>
      <header className="flex items-center gap-4 mb-10 pt-4">
        <button onClick={onBack} className={`p-2 rounded-xl shadow-sm border ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] text-white' : 'bg-white border-slate-50 text-[#264653]'}`}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={`text-2xl font-bold heading-condensed ${textColor}`}>NOTIFICATIONS</h1>
      </header>

      <div className="space-y-10">
        {(Object.entries(grouped) as [string, Notification[]][]).map(([group, items]) => (
          items.length > 0 && (
            <div key={group} className="space-y-4">
              <h3 className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest pl-2">{group}</h3>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className={`${cardBg} p-5 rounded-[2rem] border-2 shadow-sm flex gap-4 items-start`}>
                    <div className={`p-3 rounded-2xl flex-shrink-0 ${
                      item.type === 'completed' ? 'bg-emerald-50 text-emerald-500' :
                      item.type === 'alert' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                    }`}>
                      {item.type === 'completed' && <CheckCircle2 size={18} />}
                      {item.type === 'alert' && <AlertTriangle size={18} />}
                      {item.type === 'community' && <MessageSquare size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-xs font-black uppercase ${textColor}`}>{item.title}</h4>
                        <span className="text-[9px] font-bold text-slate-400">{item.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{item.message}</p>
                    </div>
                    <button className="text-slate-200 mt-1"><MoreVertical size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
