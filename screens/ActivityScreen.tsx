
import React, { useState, useEffect } from 'react';
import { MapPin, Zap, TrendingUp, Search, Loader2, Navigation, ExternalLink } from 'lucide-react';
import { findNearbyActivities } from '../services/gemini';

interface Props {
  isDarkMode: boolean;
}

const ActivityScreen: React.FC<Props> = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("Location error", err)
    );
  }, []);

  const handleSearch = async (query: string = searchTerm) => {
    if (!location) {
      alert("Please enable location access to find activities near you.");
      return;
    }
    setIsLoading(true);
    const results = await findNearbyActivities(location.lat, location.lng, query || "kids play areas");
    setActivities(results);
    setIsLoading(false);
  };

  const textColor = isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]';
  const cardBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white';

  return (
    <div className={`p-6 md:p-10 transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'} min-h-full pb-24`}>
      <header className="mb-8 pt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className={`text-3xl md:text-4xl font-bold heading-condensed ${textColor}`}>ACTIVITY HUB</h1>
          <p className="text-[#2A9D8F] font-bold text-xs uppercase tracking-widest">Smart Local Discovery</p>
        </div>
        
        <div className="relative md:w-80 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Swimming, parks, karate..." 
              className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs outline-none transition-all border-2 ${isDarkMode ? 'bg-[#24272B] border-slate-800 text-white focus:border-[#2A9D8F]' : 'bg-white border-slate-50 text-[#264653] focus:border-[#2A9D8F]'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            onClick={() => handleSearch()}
            disabled={isLoading || !location}
            className="w-12 h-12 bg-[#2A9D8F] text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:bg-slate-300"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} />}
          </button>
        </div>
      </header>

      {/* Hero: Featured Dynamic Activity */}
      {activities ? (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 mb-12">
           <div className={`${cardBg} border-2 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden`}>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-xl flex items-center justify-center">
                    <TrendingUp size={20} />
                 </div>
                 <h3 className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-[#2A9D8F]' : 'text-[#2A9D8F]'}`}>Alpha-Verified Recommendations</h3>
              </div>
              <div className={`prose prose-sm max-w-none mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-bold leading-relaxed whitespace-pre-wrap`}>
                {activities.text}
              </div>
              {activities.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {activities.links.slice(0, 3).map((link: string, i: number) => (
                    <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[#264653] text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all">
                      <MapPin size={12} /> View on Maps <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              )}
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Goal Progress Card */}
          <div className={`${cardBg} border-2 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/5 rounded-full -mr-16 -mt-16" />
            
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E9C46A] rounded-[1.2rem] flex items-center justify-center text-[#264653] shadow-sm rotate-6">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className={`text-base font-black uppercase tracking-tight ${textColor}`}>Today's Alpha Goal</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keep up the momentum!</p>
                </div>
              </div>
              <span className="text-3xl font-black text-[#2A9D8F]">82%</span>
            </div>
            
            <div className={`w-full h-5 rounded-full overflow-hidden mb-8 p-1 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <div className="h-full bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] rounded-full shadow-sm transition-all duration-1000" style={{ width: '82%' }}></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <MetricCard label="Steps" value="4.2k" isDarkMode={isDarkMode} />
              <MetricCard label="Play" value="1.5h" isDarkMode={isDarkMode} />
              <MetricCard label="Sleep" value="9.2h" isDarkMode={isDarkMode} />
            </div>
          </div>

          {/* Static Preview Card */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest mb-4 pl-2 flex items-center gap-2">
              <MapPin size={14} /> Discovery Preview
            </h3>
            <div className={`w-full h-64 border-2 rounded-[2.5rem] overflow-hidden relative shadow-sm ${isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white'}`}>
              <img 
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=800&auto=format&fit=crop" 
                alt="Map Preview" 
                className="w-full h-full object-cover opacity-60 grayscale" 
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <button 
                  onClick={() => handleSearch()}
                  className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-[2rem] shadow-xl border border-slate-100 font-black text-[10px] uppercase tracking-widest text-[#2A9D8F] hover:scale-105 active:scale-95 transition-all"
                >
                  Find Real Activities Near Me
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Chips Responsive Grid */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest pl-2">Popular Missions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Swimming', 'Painting', 'Gymnastics', 'Karate'].map((act, i) => (
            <div 
              key={i} 
              onClick={() => handleSearch(act)}
              className={`${cardBg} border-2 rounded-[2.5rem] p-5 shadow-sm hover:scale-[1.02] transition-all cursor-pointer group`}
            >
              <div className="w-full h-32 bg-slate-50 rounded-[2rem] mb-4 overflow-hidden border-2 border-transparent group-hover:border-[#E9C46A]">
                <img src={`https://picsum.photos/seed/act${i}/400/300`} alt={act} className="w-full h-full object-cover" />
              </div>
              <h4 className={`text-base font-black uppercase mb-1 tracking-tight ${textColor}`}>{act}</h4>
              <p className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-widest">Alpha Verified • Nearby</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, isDarkMode }: { label: string, value: string, isDarkMode: boolean }) => (
  <div className={`${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-slate-50/50'} rounded-2xl p-4 border ${isDarkMode ? 'border-slate-800' : 'border-slate-50'} text-center`}>
    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
    <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-[#264653]'}`}>{value}</span>
  </div>
);

export default ActivityScreen;
