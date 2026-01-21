
import React from 'react';
import { Rocket } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-screen w-full bg-[#FAF9F6] flex flex-col items-center justify-center overflow-hidden max-w-md mx-auto relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#2A9D8F]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#E9C46A]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Center Content Area */}
      <div className="z-10 flex flex-col items-center">
        {/* Logo with Elastic Entrance and Continuous Pulse/Float */}
        <div className="logo-container mb-8">
          <div className="w-24 h-24 bg-white rounded-[2.2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(42,157,143,0.15)] border border-slate-50 animate-elastic-entrance">
            <div className="animate-float-subtle">
              <Rocket size={48} className="text-[#2A9D8F] fill-[#2A9D8F]/10 animate-pulse-subtle" />
            </div>
          </div>
        </div>
        
        {/* Text with Slide + Fade Entrance */}
        <div className="text-center animate-text-entrance">
          <h1 className="text-4xl font-bold text-[#264653] tracking-wider heading-condensed leading-none">
            EASY ALPHA KIDS
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-[2px] w-6 bg-[#2A9D8F]/30 rounded-full"></div>
            <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.4em]">
              EST. 2026
            </p>
            <div className="h-[2px] w-6 bg-[#2A9D8F]/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Modern Slim Progress Indicator */}
      <div className="absolute bottom-24 left-16 right-16 h-[3px] bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#2A9D8F] rounded-full w-full animate-progress-loading origin-left"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes elastic-entrance {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          85% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes text-entrance {
          0% { transform: translateY(30px); opacity: 0; }
          40% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes progress-loading {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-elastic-entrance {
          animation: elastic-entrance 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-text-entrance {
          animation: text-entrance 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .animate-float-subtle {
          animation: float-subtle 3s ease-in-out infinite;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        .animate-progress-loading {
          animation: progress-loading 2.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default SplashScreen;
