
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Bell, ChevronLeft, ChevronRight, Plus, CheckCircle2, Circle, User, Clock, X, Star, Calendar as CalendarIcon, Baby, TrendingUp, Tag, FileText, Repeat, CalendarDays, Gift, Coffee } from 'lucide-react';
import { TimelineItem, Child } from '../types';
import { getLocalDateISO } from '../App';

interface Props {
  children: Child[];
  selectedChildIndex: number;
  onSelectChild: (index: number) => void;
  onProfileClick: () => void;
  onBellClick: () => void;
  onAddChild: (child: Child) => void;
  onInsightsClick: () => void;
  isDarkMode: boolean;
  items: TimelineItem[];
  onToggleStatus: (id: string) => void;
  onAddItem: (item: Partial<TimelineItem>) => void;
}

type ViewType = 'day' | 'month';

// Registry of Public Holidays for 2026 (Demonstration)
const HOLIDAYS_2026: Record<string, string> = {
  '2026-01-01': 'New Year',
  '2026-01-26': 'Republic Day',
  '2026-03-03': 'Holi',
  '2026-04-03': 'Good Friday',
  '2026-05-01': 'May Day',
  '2026-08-15': 'Independence Day',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-11-08': 'Diwali',
  '2026-12-25': 'Christmas'
};

const DAYS_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

const ChildAvatar: React.FC<{ child: Child; selected: boolean; onClick: () => void; isDarkMode: boolean }> = ({ child, selected, onClick, isDarkMode }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 transition-all duration-300 ${selected ? 'scale-110' : 'scale-90 opacity-60'}`}
  >
    <div className={`relative w-11 h-11 md:w-14 md:h-14 rounded-[1.2rem] p-1 border-2 transition-colors ${selected ? 'border-[#2A9D8F] bg-white rotate-2 shadow-md' : 'border-transparent'}`}>
      <div className="w-full h-full rounded-[0.9rem] overflow-hidden">
        <img src={child.avatar} alt={child.name} className="w-full h-full object-cover" />
      </div>
      {selected && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2A9D8F] border-2 border-white rounded-full flex items-center justify-center">
          <Star size={10} className="text-white fill-white" />
        </div>
      )}
    </div>
    <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest ${selected ? (isDarkMode ? 'text-white' : 'text-[#264653]') : 'text-slate-500'}`}>
      {child.name}
    </span>
  </button>
);

const ScrollPicker: React.FC<{ 
  items: string[]; 
  value: string; 
  onChange: (val: string) => void; 
  isDarkMode: boolean;
}> = ({ items, value, onChange, isDarkMode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const index = items.indexOf(value);
      if (index !== -1) {
        scrollRef.current.scrollTop = index * 40;
      }
    }
  }, [items, value]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollTop / 40);
      if (items[index] && items[index] !== value) {
        onChange(items[index]);
      }
    }
  };

  return (
    <div className="relative h-40 w-full overflow-hidden flex flex-col items-center">
      <div className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 h-10 border-y ${isDarkMode ? 'border-slate-700 bg-white/5' : 'border-slate-200 bg-black/5'} pointer-events-none z-0`} />
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll no-scrollbar snap-y snap-mandatory relative z-10 py-16"
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((item) => (
          <div 
            key={item} 
            className={`h-10 flex items-center justify-center snap-center text-sm font-black transition-all ${
              value === item 
                ? (isDarkMode ? 'text-[#2A9D8F] scale-125' : 'text-[#2A9D8F] scale-125') 
                : (isDarkMode ? 'text-slate-600' : 'text-slate-300')
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const DayStrip: React.FC<{
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  isDarkMode: boolean;
}> = ({ selectedDate, onSelectDate, isDarkMode }) => {
  const dates = useMemo(() => {
    const arr = [];
    const base = new Date(selectedDate);
    base.setDate(base.getDate() - 60);
    for (let i = 0; i < 121; i++) {
      arr.push(new Date(base));
      base.setDate(base.getDate() + 1);
    }
    return arr;
  }, [selectedDate.toDateString()]);

  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stripRef.current) {
      const selectedEl = stripRef.current.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDate]);

  return (
    <div className="relative mb-6 -mx-4">
      <div 
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
        }}
      >
        <div 
          ref={stripRef} 
          className="flex gap-2 overflow-x-auto no-scrollbar py-6 px-[20%]"
        >
          {dates.map((d, i) => {
            const dateISO = getLocalDateISO(d);
            const isSelected = d.toDateString() === selectedDate.toDateString();
            const dayOfWeek = d.getDay();
            const isSunday = dayOfWeek === 0;
            const holidayName = HOLIDAYS_2026[dateISO];
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
            const dayNum = d.getDate();

            return (
              <button
                key={i}
                data-selected={isSelected}
                onClick={() => onSelectDate(d)}
                className={`flex flex-col items-center justify-center min-w-[56px] py-4 rounded-3xl transition-all border-2 flex-shrink-0 active:scale-95 relative snap-center ${
                  isSelected 
                    ? 'bg-[#2A9D8F] border-[#2A9D8F] text-white shadow-lg scale-110 z-10' 
                    : holidayName 
                      ? (isDarkMode ? 'bg-[#2D241A] border-[#E9C46A]/40 text-[#E9C46A]' : 'bg-[#FFF9F0] border-[#E9C46A]/20 text-[#E9C46A]')
                      : isDarkMode 
                        ? 'bg-[#24272B] border-slate-800 text-slate-500' 
                        : 'bg-white border-slate-50 text-slate-400'
                }`}
              >
                <span className={`text-[8px] font-black uppercase mb-1 ${
                  isSelected ? 'text-white/80' : isSunday ? 'text-rose-400' : 'text-slate-400'
                }`}>
                  {dayName}
                </span>
                <span className="text-base font-black leading-none">{dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CalendarScreen: React.FC<Props> = ({ children, selectedChildIndex, onSelectChild, onProfileClick, onBellClick, onAddChild, onInsightsClick, isDarkMode, items, onToggleStatus, onAddItem }) => {
  const [viewType, setViewType] = useState<ViewType>('day');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [selHour, setSelHour] = useState('09');
  const [selMin, setSelMin] = useState('00');
  const [selPeriod, setSelPeriod] = useState('AM');
  const [newTaskCategory, setNewTaskCategory] = useState('play');
  const [newTaskIcon, setNewTaskIcon] = useState('✨');

  const [newChildName, setNewChildName] = useState('');
  const [newChildDob, setNewChildDob] = useState('');

  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSaveChild = () => {
    if (newChildName && newChildDob) {
      const newChild: Child = {
        id: Date.now().toString(),
        name: newChildName,
        dob: newChildDob,
        gender: 'boy',
        avatar: `https://picsum.photos/seed/${newChildName}/200/200`
      };
      onAddChild(newChild);
      setShowAddChildModal(false);
      setNewChildName('');
      setNewChildDob('');
    }
  };

  const handleSaveTask = () => {
    if (newTaskTitle) {
      const formattedTime = `${selHour}:${selMin} ${selPeriod}`;
      onAddItem({
        title: newTaskTitle,
        description: newTaskDesc || 'Alpha Task',
        time: formattedTime,
        date: getLocalDateISO(selectedDate),
        category: newTaskCategory as any,
        icon: newTaskIcon,
      });
      setShowAddModal(false);
      setNewTaskTitle('');
      setNewTaskDesc('');
    }
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(newDate);
  };

  const daysInMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    const firstDayIndex = date.getDay();
    for (let i = 0; i < firstDayIndex; i++) days.push(null);
    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= totalDays; i++) days.push(i);
    return days;
  }, [viewDate]);

  const formattedFullSelectedDate = selectedDate.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const selectedISO = getLocalDateISO(selectedDate);
  const currentHoliday = HOLIDAYS_2026[selectedISO];

  const filteredItems = items.filter(item => 
    item.childId === (children[selectedChildIndex]?.id || '1') &&
    item.date === selectedISO
  );

  const textColor = isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]';
  const cardBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white';
  const headerBg = isDarkMode ? 'bg-[#1A1C1E]' : 'bg-white';

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'}`}>
      <header className={`pt-4 pb-3 md:pt-8 md:pb-8 rounded-b-[2.5rem] md:rounded-b-[3rem] shadow-sm border-b sticky top-0 z-40 px-4 md:px-6 ${headerBg} ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="flex justify-between items-center mb-4 md:mb-6 max-w-6xl mx-auto">
          <button onClick={onProfileClick} className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-[#2A9D8F] border active:scale-90 transition-all ${isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-slate-50 border-slate-100'}`}>
            <User size={18} />
          </button>
          
          <div className={`p-0.5 rounded-2xl flex w-28 md:w-36 relative ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
             <div className={`absolute top-0.5 bottom-0.5 w-[48%] rounded-[1rem] shadow-sm transition-transform duration-300 ${isDarkMode ? 'bg-[#24272B]' : 'bg-white'} ${viewType === 'month' ? 'translate-x-[105%]' : 'translate-x-[2%]'}`} />
             <button onClick={() => setViewType('day')} className={`flex-1 py-1.5 text-[7px] md:text-[8px] font-black uppercase tracking-widest z-10 ${viewType === 'day' ? 'text-[#2A9D8F]' : 'text-slate-400'}`}>Day</button>
             <button onClick={() => setViewType('month')} className={`flex-1 py-1.5 text-[7px] md:text-[8px] font-black uppercase tracking-widest z-10 ${viewType === 'month' ? 'text-[#2A9D8F]' : 'text-slate-400'}`}>Month</button>
          </div>

          <button onClick={onBellClick} className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center relative active:scale-90 transition-all border ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] text-[#E2E2E2]' : 'bg-slate-50 border-slate-100 text-[#264653]'}`}>
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#E76F51] rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-1 px-1 items-center max-w-6xl mx-auto">
          {children.map((child, idx) => (
            <ChildAvatar 
              key={child.id} 
              child={child} 
              selected={idx === selectedChildIndex} 
              onClick={() => onSelectChild(idx)} 
              isDarkMode={isDarkMode}
            />
          ))}
          {children.length < 5 && (
            <button onClick={() => setShowAddChildModal(true)} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className={`w-11 h-11 md:w-14 md:h-14 rounded-[1.2rem] border-2 border-dashed flex items-center justify-center transition-all ${isDarkMode ? 'border-slate-700 hover:border-[#2A9D8F]' : 'border-slate-300 hover:border-[#2A9D8F]'}`}>
                <Plus size={18} className="text-slate-500" />
              </div>
              <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-slate-500">Add</span>
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 p-4 md:p-10 max-w-6xl mx-auto w-full">
        <button onClick={onInsightsClick} className={`w-full mb-6 p-4 md:p-6 rounded-3xl border-2 shadow-sm flex items-center justify-between transition-all active:scale-[0.98] md:max-w-xl md:mx-auto ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] text-white' : 'bg-white border-white text-[#264653]'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div className="text-left">
              <p className="text-[8px] font-black uppercase tracking-widest text-[#2A9D8F]">Development HQ</p>
              <p className="text-sm font-bold">View Alpha Growth Insights</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>

        {viewType === 'day' ? (
          <div className="relative md:max-w-4xl md:mx-auto">
            <DayStrip 
              selectedDate={selectedDate} 
              onSelectDate={setSelectedDate} 
              isDarkMode={isDarkMode} 
            />

            <div className="flex flex-col items-center gap-2 mb-8 md:mb-10">
              <span className={`text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm text-center ${isDarkMode ? 'bg-[#24272B] border-slate-700 text-[#2A9D8F]' : 'bg-white border-slate-50 text-[#2A9D8F]'}`}>
                {formattedFullSelectedDate.toUpperCase()}
              </span>
              {currentHoliday && (
                <span className="text-[9px] font-black text-[#E9C46A] uppercase tracking-widest flex items-center gap-1">
                  <Gift size={10} /> {currentHoliday}
                </span>
              )}
            </div>

            <div className="relative pl-6 md:pl-20 pr-1">
              <div className={`absolute left-[15px] md:left-[27px] top-4 bottom-4 w-px border-l-2 border-dashed ${isDarkMode ? 'border-[#2A9D8F]/10' : 'border-[#2A9D8F]/20'}`} />
              <div className="space-y-6 md:space-y-12">
                {filteredItems.length > 0 ? filteredItems.map(item => (
                  <div key={item.id} className="relative">
                    <button 
                      onClick={() => onToggleStatus(item.id)}
                      className={`absolute -left-[32px] md:-left-[55px] top-4 w-8 h-8 md:w-12 md:h-12 rounded-xl border-4 shadow-sm z-10 transition-all ${
                        item.status === 'completed' 
                          ? 'bg-[#2A9D8F] text-white rotate-6 border-white' 
                          : isDarkMode ? 'bg-[#1A1C1E] border-slate-800 text-slate-700' : 'bg-white border-slate-50 text-slate-200'
                      } flex items-center justify-center`}
                    >
                      {item.status === 'completed' ? <CheckCircle2 size={16} /> : <Circle size={14} />}
                    </button>
                    
                    <div className={`p-5 rounded-2xl border shadow-sm transition-all ${
                      item.status === 'completed' 
                        ? (isDarkMode ? 'bg-slate-800/40 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-100 opacity-60')
                        : cardBg
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-[9px] font-black text-[#2A9D8F] uppercase tracking-widest mb-1">{item.time}</p>
                          <h3 className={`text-base md:text-xl font-bold tracking-tight uppercase heading-condensed leading-none ${item.status === 'completed' ? 'line-through text-slate-500' : textColor}`}>
                            {item.title}
                          </h3>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg flex-shrink-0 shadow-sm border border-slate-100">
                          {item.icon}
                        </div>
                      </div>
                      <p className={`text-[11px] md:text-sm leading-relaxed font-semibold ${item.status === 'completed' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="py-16 text-center animate-in fade-in duration-500 flex flex-col items-center">
                    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200 dark:border-slate-700">
                      {currentHoliday ? <Coffee size={20} className="text-[#E9C46A]" /> : <CalendarDays size={20} className="text-slate-300 dark:text-slate-600" />}
                    </div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[10px]">
                      {currentHoliday ? "Enjoy the Holiday - No Missions Scheduled" : "No missions scheduled for this day"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 md:max-w-2xl md:mx-auto">
             <div className={`${cardBg} rounded-3xl p-6 md:p-8 shadow-sm border`}>
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-1 group cursor-pointer">
                      <h3 className={`text-xl font-bold heading-condensed ${textColor}`}>
                        {viewDate.toLocaleDateString('en-IN', { month: 'long' }).toUpperCase()}
                      </h3>
                      <div className="flex items-center gap-1 bg-[#2A9D8F]/10 px-2 py-0.5 rounded-lg text-[#2A9D8F] text-[10px] font-black transition-colors">
                        {viewDate.getFullYear()}
                      </div>
                   </div>
                   <div className="flex gap-2">
                     <button onClick={() => changeMonth(-1)} className={`p-1.5 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}><ChevronLeft size={20} className="text-[#2A9D8F]" /></button>
                     <button onClick={() => changeMonth(1)} className={`p-1.5 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}><ChevronRight size={20} className="text-[#2A9D8F]" /></button>
                   </div>
                </div>
                <div className="grid grid-cols-7 gap-1 md:gap-3">
                  {DAYS_SHORT.map((d, i) => (
                    <span key={d + i} className={`text-center text-[8px] font-black uppercase ${i === 0 ? 'text-rose-400' : 'text-slate-500'}`}>{d.slice(0, 1)}</span>
                  ))}
                  {daysInMonth.map((day, i) => {
                    if (day === null) return <div key={`empty-${i}`} className="h-10 md:h-12" />;
                    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                    const iso = getLocalDateISO(d);
                    const isSelected = d.toDateString() === selectedDate.toDateString();
                    const dayOfWeek = d.getDay();
                    const holiday = HOLIDAYS_2026[iso];

                    return (
                      <button 
                        key={i} 
                        onClick={() => {
                          setSelectedDate(d);
                          setViewType('day');
                        }}
                        className={`h-10 md:h-12 rounded-xl md:rounded-2xl font-bold text-xs relative flex flex-col items-center justify-center transition-all ${
                          isSelected 
                          ? 'bg-[#2A9D8F] text-white shadow-lg scale-105 z-10' 
                          : isDarkMode ? 'bg-slate-800 text-slate-500 hover:bg-slate-700' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        <span className={!isSelected && dayOfWeek === 0 ? 'text-rose-400' : ''}>{day}</span>
                        
                        {/* Status dots */}
                        <div className="flex gap-0.5 mt-0.5">
                          {holiday && <div className="w-1 h-1 rounded-full bg-[#E9C46A]" />}
                          {dayOfWeek === 0 && <div className="w-1 h-1 rounded-full bg-rose-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
             </div>
          </div>
        )}
      </div>

      {/* STATIC FAB - Strictly Fixed on Screen */}
      <div className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[100]">
        <button 
          onClick={() => setShowAddModal(true)} 
          className="w-14 h-14 md:w-16 md:h-16 bg-[#E9C46A] text-[#264653] rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-all hover:scale-110 border-4 border-white"
        >
          <Plus size={32} />
        </button>
      </div>

      {/* NEW MISSION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-end md:justify-center bg-black/60 backdrop-blur-[2px] p-0 md:p-6">
          <div className={`${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-white'} rounded-t-[2.5rem] md:rounded-3xl p-6 md:p-10 w-full max-w-md shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto no-scrollbar`}>
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-inherit z-10 pb-2">
               <h2 className={`text-xl font-bold heading-condensed ${textColor}`}>NEW ALPHA MISSION</h2>
               <button onClick={() => setShowAddModal(false)} className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400'}`}><X size={20} /></button>
            </div>
            
            <div className="space-y-5">
              <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-2xl border-2 border-transparent focus-within:border-[#2A9D8F]`}>
                <label className="block text-[8px] font-black text-[#2A9D8F] uppercase mb-1 tracking-widest">Mission Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bedtime Story" 
                  className={`w-full bg-transparent font-bold text-base outline-none ${textColor}`}
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>

              <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-2xl border-2 border-transparent focus-within:border-[#2A9D8F]`}>
                <label className="block text-[8px] font-black text-[#2A9D8F] uppercase mb-1 tracking-widest flex items-center gap-2">
                  <FileText size={12} /> Description
                </label>
                <textarea 
                  rows={2}
                  placeholder="Additional details for the nanny..." 
                  className={`w-full bg-transparent font-semibold text-xs outline-none resize-none ${textColor}`}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} p-3 rounded-2xl border-2 border-transparent`}>
                  <label className="block text-[8px] font-black text-[#2A9D8F] uppercase mb-1 tracking-widest flex items-center gap-2">
                    <Clock size={12} /> Mission Time
                  </label>
                  <div className="flex items-center justify-around h-32 md:h-40">
                    <ScrollPicker items={HOURS} value={selHour} onChange={setSelHour} isDarkMode={isDarkMode} />
                    <span className={`font-black text-lg ${textColor}`}>:</span>
                    <ScrollPicker items={MINUTES} value={selMin} onChange={setSelMin} isDarkMode={isDarkMode} />
                    <ScrollPicker items={PERIODS} value={selPeriod} onChange={setSelPeriod} isDarkMode={isDarkMode} />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSaveTask}
                disabled={!newTaskTitle}
                className="w-full py-4 bg-[#2A9D8F] disabled:bg-slate-300 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg active:scale-95 transition-all mt-2 text-xs"
              >
                SAVE MISSION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarScreen;
