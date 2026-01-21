
import React, { useState } from 'react';
import { Search, Heart, Share2, BookOpen, ArrowLeft, Sparkles, Loader2, ExternalLink, X, Bookmark, Globe } from 'lucide-react';
import { GuideArticle } from '../types';
import { summarizeArticle, searchAlphaGuide } from '../services/gemini';

const ARTICLES: GuideArticle[] = [
  { 
    id: '1', 
    title: 'Safe Sleep and SIDS Prevention', 
    category: 'Wellness', 
    source: 'American Academy of Pediatrics (AAP)',
    summary: 'Essential guidelines for reducing the risk of SIDS and ensuring your infant sleeps safely.', 
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop',
    fullContent: `Safe sleep is one of the most important things you can do for your baby. According to the AAP, infants should always sleep on their backs for every sleep time—including naps. 

Key Guidelines:
1. Back to Sleep: Always place babies on their backs.
2. Firm Surface: Use a flat, non-inclined surface.
3. Bare is Best: Keep the crib free of soft objects, toys, pillows, and loose bedding.
4. Room Sharing, Not Bed Sharing: Keep baby close to your bed, but on a separate surface for at least 6 months.
5. Overheating: Do not let your baby get too hot; a simple sleep sack is better than blankets.

These recommendations help reduce the risk of SIDS and other sleep-related infant deaths significantly.`,
    sourceUrl: 'https://www.aap.org'
  },
  { 
    id: '2', 
    title: 'Complementary Feeding Guidelines', 
    category: 'Nutrition', 
    source: 'World Health Organization (WHO)',
    summary: 'When and how to introduce solid foods alongside breastfeeding for optimal growth.', 
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop',
    fullContent: `At around 6 months, a baby's need for energy and nutrients starts to exceed what is provided by breast milk. Complementary foods are necessary to fill the gap.

Principles for Feeding:
- Continue frequent, on-demand breastfeeding until 2 years of age or beyond.
- Practice responsive feeding: Feed slowly and encourage, but do not force.
- Hygiene is critical: Prepare and feed food with clean hands and utensils.
- Variety is key: Introduce a diverse range of foods (meat, poultry, fish, eggs, fruits, vegetables).
- Avoid sugary drinks and excessive salt.

The transition to solid foods is a critical window for establishing healthy eating habits for life.`,
    sourceUrl: 'https://www.who.int'
  },
  { 
    id: '3', 
    title: 'Managing Screen Time for Preschoolers', 
    category: 'Behavior', 
    source: 'Mayo Clinic',
    summary: 'Balanced strategies for digital play without compromising developmental milestones.', 
    imageUrl: 'https://images.unsplash.com/photo-1510213338990-2414b47bc7f1?q=80&w=800&auto=format&fit=crop',
    fullContent: `Screen time is a major concern for modern parents. The Mayo Clinic suggests quality over quantity, but still recommends strict limits for children under 5.

Recommended Limits:
- Under 18-24 months: No screen time other than video chatting.
- 2 to 5 years: Limit to 1 hour per day of high-quality programming.

Alpha Parent Strategies:
- Watch together: Co-viewing helps children understand what they see.
- Screen-free zones: No tech in bedrooms or during mealtimes.
- Tech as a tool, not a sitter: Use apps that encourage creativity or movement rather than passive scrolling.

Consistently prioritizing high-touch play over high-tech play ensures healthy brain development and social skills.`,
    sourceUrl: 'https://www.mayoclinic.org'
  }
];

const GuideScreen: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<GuideArticle[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSummarize = async () => {
    if (!selectedArticle) return;
    setIsSummarizing(true);
    setAiSummary(null);
    const summary = await summarizeArticle(selectedArticle.title, selectedArticle.fullContent);
    setAiSummary(summary);
    setIsSummarizing(false);
  };

  const handleGlobalSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setSearchResults(null);
    try {
      const results = await searchAlphaGuide(searchTerm);
      const enrichedResults = results?.map((res: any, idx: number) => ({
        ...res,
        imageUrl: `https://picsum.photos/seed/guide${idx}/800/500`
      })) || [];
      setSearchResults(enrichedResults);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const renderFormattedSummary = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="font-black text-[#2A9D8F] block mt-4 mb-1 uppercase tracking-tight text-xs">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  const currentArticles = searchResults || ARTICLES.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const textColor = isDarkMode ? 'text-white' : 'text-[#264653]';
  const cardBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-white';

  if (selectedArticle) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col page-transition-slide-up ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-white'}`}>
        <header className={`px-4 py-4 border-b flex items-center justify-between sticky top-0 z-10 ${isDarkMode ? 'bg-[#24272B] border-slate-800' : 'bg-white border-slate-100'}`}>
          <button onClick={() => { setSelectedArticle(null); setAiSummary(null); }} className="p-2 rounded-xl text-slate-400 hover:text-[#2A9D8F] transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="flex items-center gap-2 px-3 py-2 bg-[#2A9D8F] text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg disabled:opacity-50 transition-all"
            >
              {isSummarizing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              Summary
            </button>
            <button className="p-2 rounded-xl text-slate-400">
              <Share2 size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          <div className="w-full aspect-[16/10] relative">
            <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-3 py-1 bg-[#2A9D8F] rounded-full text-[8px] font-black text-white uppercase tracking-wider mb-2 inline-block">
                {selectedArticle.category}
              </span>
              <h1 className="text-xl font-bold text-white heading-condensed leading-tight">{selectedArticle.title}</h1>
            </div>
          </div>

          <div className="p-6 space-y-6 max-w-2xl mx-auto">
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Bookmark size={16} />
                </div>
                <div>
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Source</p>
                  <p className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{selectedArticle.source}</p>
                </div>
              </div>
              {selectedArticle.sourceUrl && (
                <a href={selectedArticle.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#2A9D8F]">
                  <ExternalLink size={16} />
                </a>
              )}
            </div>

            <div className={`prose prose-sm max-w-none leading-relaxed whitespace-pre-wrap font-bold text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedArticle.fullContent}
            </div>
          </div>
        </div>

        {(isSummarizing || aiSummary) && (
          <div className="fixed inset-x-4 bottom-4 z-20 animate-in slide-in-from-bottom-6 duration-500">
            <div className={`rounded-[2rem] shadow-2xl border-4 p-6 relative overflow-hidden ${isDarkMode ? 'bg-[#24272B] border-[#2A9D8F]/20' : 'bg-white border-[#2A9D8F]/10'}`}>
              <button 
                onClick={() => { setAiSummary(null); setIsSummarizing(false); }} 
                className="absolute top-4 right-4 text-slate-400"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={18} className="text-[#2A9D8F]" />
                <h3 className="text-xs font-black uppercase tracking-widest text-[#2A9D8F]">Alpha-Brief</h3>
              </div>
              {isSummarizing ? (
                <div className="flex items-center py-6 gap-3">
                  <Loader2 className="animate-spin text-[#2A9D8F]" size={20} />
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#2A9D8F]">Analyzing data...</p>
                </div>
              ) : (
                <div className={`text-[10px] leading-relaxed whitespace-pre-wrap font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {renderFormattedSummary(aiSummary || '')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`p-4 transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'} min-h-full pb-24 w-full overflow-x-hidden`}>
      <header className="mb-6 pt-2">
        <h1 className={`text-2xl font-bold heading-condensed ${textColor}`}>ALPHA GUIDE</h1>
        <p className="text-[#2A9D8F] font-black text-[9px] uppercase tracking-widest">Expert Professional Advice</p>
      </header>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search symptoms, help, play..." 
            className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-bold outline-none border-2 ${isDarkMode ? 'bg-[#24272B] border-slate-800 text-white focus:border-[#2A9D8F]' : 'bg-white border-slate-50 text-[#264653] focus:border-[#2A9D8F]'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch()}
          />
        </div>
        <button 
          onClick={handleGlobalSearch}
          disabled={isSearching || !searchTerm}
          className="w-11 h-11 bg-[#2A9D8F] text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:bg-slate-300"
        >
          {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar mb-8 pb-1">
        <button 
          className={`flex-shrink-0 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
            !searchResults ? 'bg-[#264653] text-white shadow-lg' : isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-400 border border-slate-50'
          }`}
          onClick={() => { setSearchResults(null); setSearchTerm(''); }}
        >
          Featured
        </button>
        {['Wellness', 'Nutrition', 'Behavior'].map((cat) => (
          <button 
            key={cat} 
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
              searchTerm === cat && !searchResults
              ? 'bg-[#264653] text-white shadow-lg' 
              : isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-400 border border-slate-50'
            }`}
            onClick={() => { setSearchResults(null); setSearchTerm(cat); }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {isSearching && (
          <div className="py-12 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={28} />
            <p className="text-[9px] font-black uppercase tracking-widest text-[#2A9D8F]">Scanning Journals...</p>
          </div>
        )}
        
        {!isSearching && currentArticles.map((article) => (
          <div 
            key={article.id} 
            onClick={() => setSelectedArticle(article)}
            className="group cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="relative w-full aspect-video rounded-[1.8rem] overflow-hidden mb-3 shadow-sm border-2 border-transparent group-hover:border-[#E9C46A] transition-all">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700" />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white/95 rounded-full text-[7px] font-black text-[#264653] uppercase tracking-widest">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="px-1">
              <h3 className={`text-base font-bold mb-1 leading-tight heading-condensed ${textColor}`}>{article.title}</h3>
              <p className={`text-[10px] leading-relaxed line-clamp-2 font-black ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {article.summary}
              </p>
            </div>
          </div>
        ))}

        {!isSearching && currentArticles.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[8px]">No matches found. Try specific keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideScreen;
