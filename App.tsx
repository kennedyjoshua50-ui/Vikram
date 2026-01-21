
import React, { useState, useEffect } from 'react';
import { Footprints, Sparkles, Handshake, Heart, Calendar, Menu, X } from 'lucide-react';
import Login from './screens/Login';
import OnboardingWizard from './screens/OnboardingWizard';
import CalendarScreen from './screens/CalendarScreen';
import ActivityScreen from './screens/ActivityScreen';
import AIChatScreen from './screens/AIChatScreen';
import NannyScreen from './screens/NannyScreen';
import GuideScreen from './screens/GuideScreen';
import NotificationPage from './screens/NotificationPage';
import ProfilePage from './screens/ProfilePage';
import SplashScreen from './screens/SplashScreen';
import InsightsPage from './screens/InsightsPage';
import { OnboardingData, Child, TimelineItem } from './types';

enum AppScreen {
  Splash,
  Login,
  Onboarding,
  Main,
  Notifications,
  Profile,
  Insights
}

export enum Tab {
  Calendar = 'Calendar',
  Activity = 'Activity',
  AIChat = 'AI Chat',
  Nanny = 'Nanny',
  Guide = 'Guide'
}

// Get local date string in YYYY-MM-DD format
export const getLocalDateISO = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const INITIAL_TIMELINE: TimelineItem[] = [
  { id: '1', childId: '1', date: getLocalDateISO(), time: '08:00 AM', title: 'Breakfast', description: 'Yogurt with granola and honey. Ensure milk is organic.', status: 'completed', icon: '🥣', category: 'food', repeatType: 'daily' },
  { id: '2', childId: '1', date: getLocalDateISO(), time: '10:00 AM', title: 'School Drop', description: 'Ensure bag has the extra mask and sanitizer.', status: 'completed', icon: '🚌', category: 'school', repeatType: 'custom', repeatDays: [1, 2, 3, 4, 5] },
  { id: '3', childId: '1', date: getLocalDateISO(), time: '01:00 PM', title: 'Lunch', description: 'Nanny to serve Paneer Paratha with curd.', status: 'pending', icon: '🥘', category: 'food', repeatType: 'daily' },
  { id: '4', childId: '1', date: getLocalDateISO(), time: '04:00 PM', title: 'Medicine', description: 'Zincovit 5ml after milk intake.', status: 'pending', icon: '💊', category: 'meds', repeatType: 'once' },
  { id: '5', childId: '1', date: getLocalDateISO(), time: '06:00 PM', title: 'Park Playtime', description: 'Meeting friends at the local park for 1 hour.', status: 'pending', icon: '🛝', category: 'play', repeatType: 'once' },
];

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.Splash);
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Calendar);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(INITIAL_TIMELINE);

  useEffect(() => {
    if (screen === AppScreen.Splash) {
      const timer = setTimeout(() => {
        setScreen(AppScreen.Login);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleLogin = () => setScreen(AppScreen.Onboarding);
  
  const handleOnboardingComplete = (data: OnboardingData) => {
    setChildren(data.children);
    setScreen(AppScreen.Main);
  };

  const handleAddChild = (newChild: Child) => {
    setChildren(prev => [...prev, newChild]);
    setSelectedChildIndex(children.length);
  };

  const handleAddTimelineItem = (item: Partial<TimelineItem>) => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      childId: children[selectedChildIndex]?.id || '1',
      date: item.date || getLocalDateISO(),
      time: item.time || '09:00 AM',
      title: item.title || 'New Activity',
      description: item.description || 'Alpha Task',
      category: item.category || 'play',
      icon: item.icon || '✨',
      status: 'pending',
      repeatType: item.repeatType || 'once',
      repeatDays: item.repeatDays
    };
    setTimelineItems(prev => [...prev, newItem].sort((a, b) => a.time.localeCompare(b.time)));
  };

  const toggleTaskStatus = (id: string) => {
    setTimelineItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' } : item
    ));
  };

  const navigateToNotifications = () => setScreen(AppScreen.Notifications);
  const navigateToProfile = () => setScreen(AppScreen.Profile);
  const navigateToInsights = () => setScreen(AppScreen.Insights);
  const navigateBack = () => setScreen(AppScreen.Main);

  const renderTabContent = () => {
    switch (currentTab) {
      case Tab.Calendar: 
        return (
          <CalendarScreen 
            children={children} 
            selectedChildIndex={selectedChildIndex} 
            onSelectChild={setSelectedChildIndex}
            onProfileClick={navigateToProfile}
            onBellClick={navigateToNotifications}
            onAddChild={handleAddChild}
            onInsightsClick={navigateToInsights}
            isDarkMode={isDarkMode}
            items={timelineItems}
            onToggleStatus={toggleTaskStatus}
            onAddItem={handleAddTimelineItem}
          />
        );
      case Tab.Activity: return <ActivityScreen isDarkMode={isDarkMode} />;
      case Tab.AIChat: return <AIChatScreen isDarkMode={isDarkMode} selectedChild={children[selectedChildIndex]} />;
      case Tab.Nanny: return <NannyScreen isDarkMode={isDarkMode} />;
      case Tab.Guide: return <GuideScreen isDarkMode={isDarkMode} />;
      default: return null;
    }
  };

  const renderMainContent = () => {
    if (screen === AppScreen.Notifications) return <div className="page-transition-slide-right h-full w-full"><NotificationPage onBack={navigateBack} isDarkMode={isDarkMode} /></div>;
    if (screen === AppScreen.Profile) return <div className="page-transition-slide-left h-full w-full"><ProfilePage onBack={navigateBack} onLogout={() => setScreen(AppScreen.Login)} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} /></div>;
    if (screen === AppScreen.Insights) return <div className="page-transition-slide-up h-full w-full"><InsightsPage onBack={navigateBack} isDarkMode={isDarkMode} child={children[selectedChildIndex]} /></div>;

    return (
      <div key={currentTab} className="tab-content-enter h-full w-full">
        {renderTabContent()}
      </div>
    );
  };

  if (screen === AppScreen.Splash) return <SplashScreen />;
  
  if (screen === AppScreen.Login) return (
    <div className="page-transition-fade h-screen w-full">
      <Login onLogin={handleLogin} isDarkMode={isDarkMode} />
    </div>
  );

  if (screen === AppScreen.Onboarding) return (
    <div className="page-transition-slide-right h-screen w-full">
      <OnboardingWizard onComplete={handleOnboardingComplete} isDarkMode={isDarkMode} />
    </div>
  );

  const isTabbedScreen = screen === AppScreen.Main || screen === AppScreen.Insights;

  return (
    <div className={`flex min-h-screen w-full ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'} transition-colors duration-300`}>
      {/* Desktop Sidebar Navigation */}
      {isTabbedScreen && (
        <aside className={`hidden md:flex flex-col w-24 lg:w-64 border-r sticky top-0 h-screen z-50 transition-colors duration-300 ${isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-slate-100'}`}>
          <div className="p-8 flex items-center gap-3">
             <div className="w-10 h-10 bg-[#2A9D8F] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">EA</div>
             <span className={`hidden lg:block font-black text-lg tracking-tighter heading-condensed ${isDarkMode ? 'text-white' : 'text-[#264653]'}`}>EASY ALPHA</span>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-8">
            <SideNavButton 
              active={currentTab === Tab.Calendar} 
              onClick={() => { setCurrentTab(Tab.Calendar); setScreen(AppScreen.Main); }} 
              icon={<Calendar size={22} />} 
              label="Timeline" 
              isDarkMode={isDarkMode}
            />
            <SideNavButton 
              active={currentTab === Tab.Activity} 
              onClick={() => { setCurrentTab(Tab.Activity); setScreen(AppScreen.Main); }} 
              icon={<Footprints size={22} />} 
              label="Activity Hub" 
              isDarkMode={isDarkMode}
            />
            <SideNavButton 
              active={currentTab === Tab.AIChat} 
              onClick={() => { setCurrentTab(Tab.AIChat); setScreen(AppScreen.Main); }} 
              icon={<Sparkles size={22} />} 
              label="Alpha AI Chat" 
              isDarkMode={isDarkMode}
              primary
            />
            <SideNavButton 
              active={currentTab === Tab.Nanny} 
              onClick={() => { setCurrentTab(Tab.Nanny); setScreen(AppScreen.Main); }} 
              icon={<Handshake size={22} />} 
              label="Nanny Mgmt" 
              isDarkMode={isDarkMode}
            />
            <SideNavButton 
              active={currentTab === Tab.Guide} 
              onClick={() => { setCurrentTab(Tab.Guide); setScreen(AppScreen.Main); }} 
              icon={<Heart size={22} />} 
              label="Expert Guide" 
              isDarkMode={isDarkMode}
            />
          </nav>

          <div className="p-6">
            <button 
              onClick={navigateToProfile}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#E9C46A]">
                <img src="https://picsum.photos/seed/parent/100/100" className="w-full h-full object-cover" />
              </div>
              <div className="hidden lg:block text-left">
                <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-[#264653]'}`}>Sameer Mehta</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">View HQ</p>
              </div>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col items-center w-full ${isTabbedScreen ? 'md:pl-0' : ''}`}>
        <div className={`w-full transition-all duration-300 ${isTabbedScreen ? 'max-w-6xl' : 'max-w-md'} flex flex-col min-h-screen relative`}>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-32 md:pb-12 h-full w-full">
            {renderMainContent()}
          </div>

          {/* Mobile Bottom Navigation */}
          {isTabbedScreen && screen === AppScreen.Main && (
            <nav className={`md:hidden fixed bottom-0 left-0 w-full ${isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-slate-100'} border-t px-6 pt-3 pb-8 flex justify-between items-end z-50 rounded-t-[2.5rem] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)] page-transition-slide-up`}>
              <NavButton 
                active={currentTab === Tab.Calendar} 
                onClick={() => { setCurrentTab(Tab.Calendar); setScreen(AppScreen.Main); }} 
                icon={<Calendar size={20} />} 
                label="Timeline" 
                isDarkMode={isDarkMode}
              />
              <NavButton 
                active={currentTab === Tab.Activity} 
                onClick={() => { setCurrentTab(Tab.Activity); setScreen(AppScreen.Main); }} 
                icon={<Footprints size={20} />} 
                label="Activity" 
                isDarkMode={isDarkMode}
              />
              <div className="relative -top-4">
                <button 
                  onClick={() => { setCurrentTab(Tab.AIChat); setScreen(AppScreen.Main); }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    currentTab === Tab.AIChat 
                    ? 'bg-[#E76F51] text-white scale-110' 
                    : 'bg-[#2A9D8F] text-white hover:scale-105'
                  }`}
                >
                  <Sparkles size={28} />
                </button>
              </div>
              <NavButton 
                active={currentTab === Tab.Nanny} 
                onClick={() => { setCurrentTab(Tab.Nanny); setScreen(AppScreen.Main); }} 
                icon={<Handshake size={20} />} 
                label="Nanny" 
                isDarkMode={isDarkMode}
              />
              <NavButton 
                active={currentTab === Tab.Guide} 
                onClick={() => { setCurrentTab(Tab.Guide); setScreen(AppScreen.Main); }} 
                icon={<Heart size={20} />} 
                label="Guide" 
                isDarkMode={isDarkMode}
              />
            </nav>
          )}
        </div>
      </main>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isDarkMode: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, isDarkMode }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#2A9D8F]' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}
  >
    <div className={`p-1.5 rounded-xl transition-all ${active ? (isDarkMode ? 'bg-[#2A9D8F]/20' : 'bg-[#2A9D8F]/10') : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

const SideNavButton: React.FC<NavButtonProps & { primary?: boolean }> = ({ active, onClick, icon, label, isDarkMode, primary }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
      active 
        ? (primary ? 'bg-[#E76F51] text-white shadow-lg' : 'bg-[#2A9D8F]/10 text-[#2A9D8F]') 
        : (isDarkMode ? 'text-slate-500 hover:bg-white/5' : 'text-slate-400 hover:bg-slate-50')
    }`}
  >
    <div className="flex-shrink-0">{icon}</div>
    <span className="hidden lg:block text-sm font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
