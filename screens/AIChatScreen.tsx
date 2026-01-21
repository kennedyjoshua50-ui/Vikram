
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, Loader2, MessageSquare } from 'lucide-react';
import { Message, Child } from '../types';
import { getGeminiChatResponse } from '../services/gemini';

const GENERAL_PRESETS = [
  "Draft Note to Teacher",
  "Nanny Interview Tips",
  "Medical Help",
  "Weekend Activity Ideas"
];

interface AIChatProps {
  isDarkMode?: boolean;
  selectedChild: Child;
}

const AIChatScreen: React.FC<AIChatProps> = ({ isDarkMode, selectedChild }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `Hello! I'm your Alpha Assistant. How can I help with ${selectedChild?.name || 'your child'} today? I can help you draft notes, manage staff, or suggest activities.`, sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToUse?: string) => {
    const text = textToUse || input;
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const result = await getGeminiChatResponse(text);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), text: result.text || "I've processed your request.", sender: 'ai', timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const textColor = isDarkMode ? 'text-white' : 'text-[#264653]';
  const headerBg = isDarkMode ? 'bg-[#24272B]' : 'bg-white';
  const chatAreaBg = isDarkMode ? 'bg-[#1A1C1E]' : 'bg-slate-50';
  const inputContainerBg = isDarkMode ? 'bg-[#24272B]' : 'bg-white';

  return (
    <div className={`flex flex-col h-full transition-colors duration-300 ${chatAreaBg}`}>
      <header className={`px-6 py-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} flex items-center gap-3 sticky top-0 z-10 ${headerBg}`}>
        <div className="w-10 h-10 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-xl flex items-center justify-center shadow-sm">
          <Sparkles size={22} />
        </div>
        <div>
          <h1 className={`text-base font-bold heading-condensed ${textColor}`}>ALPHA AI ASSISTANT</h1>
          <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Active Support</p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[90%] md:max-w-[70%] p-5 rounded-[2rem] flex gap-4 ${
              msg.sender === 'user' 
              ? 'bg-[#264653] text-white rounded-tr-none shadow-lg' 
              : `${isDarkMode ? 'bg-[#24272B] border-slate-800' : 'bg-white border-white'} border-2 text-slate-700 rounded-tl-none shadow-sm`
            }`}>
              {msg.sender === 'ai' && <Bot size={18} className="flex-shrink-0 mt-1 text-[#2A9D8F]" />}
              <div className={`text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-semibold ${msg.sender === 'ai' && isDarkMode ? 'text-slate-300' : ''}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className={`${isDarkMode ? 'bg-[#24272B] border-slate-800' : 'bg-white border-white'} border-2 p-5 rounded-[2rem] rounded-tl-none flex items-center gap-3 shadow-sm`}>
              <Loader2 size={16} className="animate-spin text-[#2A9D8F]" />
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Alpha AI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 md:p-8 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} space-y-6 ${inputContainerBg}`}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[9px] font-black text-[#2A9D8F] uppercase tracking-widest pl-2">
            <MessageSquare size={12} /> Suggestions
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {GENERAL_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => handleSend(preset)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-tight transition-all active:scale-95 ${
                  isDarkMode ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-50 hover:bg-slate-100 border border-slate-100 text-[#264653]'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              className={`w-full rounded-[2rem] px-6 py-4 text-xs font-bold outline-none transition-all border-2 ${
                isDarkMode 
                ? 'bg-[#1A1C1E] border-slate-800 text-white focus:border-[#2A9D8F]' 
                : 'bg-slate-50 border-slate-50 text-[#264653] focus:border-[#2A9D8F] focus:bg-white'
              }`}
              placeholder="How can I simplify your day?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-14 h-14 bg-[#264653] text-white rounded-2xl flex items-center justify-center hover:bg-[#2A9D8F] disabled:bg-slate-300 transition-all shadow-xl active:scale-90"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatScreen;
