
import React, { useState } from 'react';
import { Bell, ChevronLeft, ChevronRight, Plus, CheckCircle2, Circle, MoreHorizontal } from 'lucide-react';
import { TimelineItem } from '../types';

// Helper function to get today's date in YYYY-MM-DD format
const getTodayISO = () => new Date().toISOString().split('T')[0];

// Fixed: Added mandatory repeatType property to match the TimelineItem interface definition in types.ts
const INITIAL_ITEMS: TimelineItem[] = [
  { id: '1', childId: '1', date: getTodayISO(), time: '08:00 AM', title: 'Breakfast', description: 'Yogurt with granola and honey.', status: 'completed', icon: '🥣', category: 'food', color: '#2A9D8F', repeatType: 'daily' },
  { id: '2', childId: '1', date: getTodayISO(), time: '10:00 AM', title: 'School Drop', description: 'Ensure bag has the extra mask.', status: 'completed', icon: '🚌', category: 'school', color: '#E9C46A', repeatType: 'daily' },
  { id: '3', childId: '1', date: getTodayISO(), time: '01:00 PM', title: 'Lunch', description: 'Nanny to serve Paneer Paratha.', status: 'pending', icon: '🥘', category: 'food', color: '#E76F51', repeatType: 'daily' },
  { id: '4', childId: '1', date: getTodayISO(), time: '04:00 PM', title: 'Medicine', description: 'Zincovit 5ml after milk.', status: 'pending', icon: '💊', category: 'meds', color: '#2A9D8F', repeatType: 'once' },
  { id: '5', childId: '1', date: getTodayISO(), time: '06:00 PM', title: 'Parks & Play', description: 'Meeting kids at Emerald Park.', status: 'pending', icon: '🛝', category: 'play', color: '#E9C46A', repeatType: 'daily' },
];

interface Props {
  childName: string;
}

const TimelineScreen: React.FC<Props> = ({ childName }) => {
  const [items, setItems] = useState<TimelineItem[]>(INITIAL_ITEMS);

  const toggleStatus = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' } : item
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-40 rounded-b-[2rem] border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[1.2rem] p-0.5 border-2 border-[#E76F51] shadow-md transform rotate-2 overflow-hidden bg-white">
            <img src={`https://picsum.photos/seed/${childName}/100/100`} alt={childName} className="w-full h-full object-cover rounded-[1rem]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#264653] tracking-tighter uppercase leading-none">{childName}</h1>
            <p className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-widest">Active Schedule</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-1.5 border-2 border-slate-50 shadow-sm">
          <ChevronLeft size={16} className="text-[#2A9D8F] cursor-pointer" />
          <span className="text-xs font-bold text-[#264653]">24 OCT</span>
          <ChevronRight size={16} className="text-[#2A9D8F] cursor-pointer" />
        </div>

        <button className="p-3 bg-white rounded-2xl text-[#264653] border-2 border-slate-50 shadow-sm relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#E76F51] rounded-full border-2 border-white"></span>
        </button>
      </header>

      {/* Vertical Timeline */}
      <div className="flex-1 px-6 py-10 relative">
        {/* Playful Dotted Line */}
        <div className="absolute left-[39px] top-10 bottom-10 w-0.5 border-l-2 border-dashed border-[#2A9D8F]/20"></div>

        <div className="space-y-12">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 relative group">
              {/* Time Section */}
              <div className="w-12 pt-3 flex flex-col items-center">
                <span className="text-[10px] font-black text-[#264653] whitespace-nowrap">{item.time.split(' ')[0]}</span>
                <span className="text-[8px] font-bold text-[#2A9D8F] uppercase">{item.time.split(' ')[1]}</span>
              </div>

              {/* Connector Dot */}
              <div className="relative z-10">
                <button 
                  onClick={() => toggleStatus(item.id)}
                  className={`w-10 h-10 rounded-[1.1rem] flex items-center justify-center border-4 border-white shadow-lg transition-all transform group-hover:scale-110 active:scale-90 ${
                    item.status === 'completed' 
                    ? 'bg-[#2A9D8F] text-white rotate-12' 
                    : 'bg-white text-slate-300 border-2 border-slate-50'
                  }`}
                >
                  {item.status === 'completed' ? <CheckCircle2 size={20} /> : <Circle size={16} />}
                </button>
              </div>

              {/* Event Card (Squircle) */}
              <div className={`flex-1 p-5 rounded-[2.2rem] border-2 transition-all relative overflow-hidden ${
                item.status === 'completed' 
                ? 'bg-slate-50 border-slate-100 opacity-60' 
                : 'bg-white border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
              }`}>
                {/* Accent bar */}
                {!item.status && <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 opacity-10 rounded-full -mr-12 -mt-12"></div>}
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-bold leading-none tracking-tight ${item.status === 'completed' ? 'text-slate-400 line-through' : 'text-[#264653]'}`}>
                    {item.title}
                  </h3>
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">{item.icon}</div>
                </div>
                
                <p className={`text-xs font-semibold leading-relaxed ${item.status === 'completed' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                   <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.status === 'completed' ? 'bg-slate-200 text-slate-400' : 'bg-[#E9C46A]/20 text-[#264653]'}`}>
                      {item.status === 'completed' ? 'MISSION COMPLETE' : 'UPCOMING'}
                   </div>
                   <MoreHorizontal size={14} className="text-slate-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-32 right-8 w-16 h-16 bg-[#E9C46A] text-[#264653] rounded-[2rem] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-90 transition-all z-40">
        <Plus size={32} />
      </button>
    </div>
  );
};

export default TimelineScreen;
