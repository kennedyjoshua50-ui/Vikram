
import React, { useState } from 'react';
import { Mail, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  isDarkMode: boolean;
}

type LoginStep = 'ENTRY' | 'OTP' | 'EMAIL_SIGNIN' | 'EMAIL_SIGNUP' | 'SOCIAL_LOADING';

const GoogleLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.05 20.28c-.96.95-2.1 1.72-3.41 1.72-1.2 0-1.61-.74-3.1-.74-1.48 0-1.99.72-3.08.74-1.28.02-2.58-.93-3.62-2.14-2.14-2.49-2.29-6.33-.4-8.79.94-1.23 2.21-1.96 3.51-1.96 1.13 0 2.04.66 2.89.66.82 0 1.95-.73 3.28-.73 1.39 0 2.58.62 3.37 1.63-2.9 1.54-2.43 5.48.56 6.81-.66 1.35-1.42 2.76-2.43 3.73l.43.07zM12.03 7.25c-.02-2.23 1.84-4.21 4.04-4.25.18 2.37-2.18 4.51-4.04 4.25z"/>
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode }) => {
  const [step, setStep] = useState<LoginStep>('ENTRY');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textColor = isDarkMode ? 'text-[#E2E2E2]' : 'text-[#264653]';
  const inputBg = isDarkMode ? 'bg-[#24272B] border-[#2F3338]' : 'bg-white border-slate-100';

  const handleGetOtp = () => {
    if (phone.length === 10) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep('OTP');
      }, 1000);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.every(v => v !== '')) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onLogin();
      }, 1500);
    }
  };

  const handleSocialLogin = () => {
    setStep('SOCIAL_LOADING');
    setTimeout(() => onLogin(), 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin();
    }, 1500);
  };

  const renderEntry = () => (
    <div className="flex-1 px-8 pt-10 space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
      <div>
        <h2 className={`text-base font-bold mb-4 text-center ${textColor}`}>WELCOME BACK!</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-[#2A9D8F] text-sm font-black">+91</span>
          </div>
          <input
            type="tel"
            maxLength={10}
            className={`block w-full pl-14 pr-4 py-3 border-2 rounded-[1.5rem] focus:ring-4 focus:ring-[#2A9D8F]/10 focus:border-[#2A9D8F] outline-none transition-all font-bold ${inputBg} ${isDarkMode ? 'text-white' : 'text-slate-700'}`}
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          />
        </div>
      </div>

      <button
        onClick={handleGetOtp}
        disabled={phone.length !== 10 || isSubmitting}
        className="w-full py-3 bg-[#2A9D8F] text-white font-bold rounded-[1.2rem] hover:bg-[#21867a] active:scale-[0.98] transition-all shadow-lg shadow-[#2A9D8F]/20 text-base uppercase tracking-widest flex items-center justify-center gap-2"
      >
        {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : "Get OTP"}
      </button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}></div>
        </div>
        <div className="relative flex justify-center text-[10px]">
          <span className={`px-4 font-black uppercase ${isDarkMode ? 'bg-[#1A1C1E] text-slate-500' : 'bg-[#FAF9F6] text-slate-400'}`}>Or join with</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <SocialButton onClick={handleSocialLogin} icon={<GoogleLogo />} isDarkMode={isDarkMode} />
        <SocialButton onClick={handleSocialLogin} icon={<AppleLogo />} isDarkMode={isDarkMode} />
        <SocialButton onClick={() => setStep('EMAIL_SIGNIN')} icon={<Mail size={20} className="text-slate-600" />} isDarkMode={isDarkMode} />
      </div>

      <p className="text-center text-[9px] text-slate-500 px-10">
        By continuing, you're joining the elite circle of Alpha Parents. 
        <span className="block mt-1 font-bold">Terms apply.</span>
      </p>
    </div>
  );

  const renderOtp = () => (
    <div className="flex-1 px-8 pt-10 space-y-8 animate-in fade-in slide-in-from-right duration-500">
      <button onClick={() => setStep('ENTRY')} className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
        <ArrowLeft size={14} /> Back
      </button>
      
      <div className="text-center">
        <h2 className={`text-xl font-bold mb-2 ${textColor}`}>VERIFY PHONE</h2>
        <p className="text-[10px] text-slate-500 font-semibold italic">Sent to +91 {phone}</p>
      </div>

      <div className="flex justify-center gap-3">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="tel"
            maxLength={1}
            className={`w-12 h-14 border-2 rounded-xl text-center text-xl font-black focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/10 outline-none transition-all shadow-sm ${inputBg} ${textColor}`}
            value={digit}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              const newOtp = [...otp];
              newOtp[idx] = val;
              setOtp(newOtp);
              if (val && e.target.nextSibling) (e.target.nextSibling as HTMLInputElement).focus();
            }}
          />
        ))}
      </div>

      <div className="space-y-4">
        <button
          onClick={handleVerifyOtp}
          disabled={otp.some(v => v === '') || isSubmitting}
          className="w-full py-3 bg-[#2A9D8F] text-white font-bold rounded-[1.2rem] shadow-xl text-base uppercase tracking-widest transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : "Verify Mission"}
        </button>
        <button className="w-full py-2 text-[9px] font-black text-[#2A9D8F] uppercase tracking-widest">Resend OTP in 24s</button>
      </div>
    </div>
  );

  const renderEmail = (isSignUp: boolean) => (
    <div className="flex-1 px-8 pt-10 space-y-6 animate-in fade-in slide-in-from-right duration-500">
      <button onClick={() => setStep('ENTRY')} className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
        <ArrowLeft size={14} /> Back
      </button>

      <div className="text-center">
        <h2 className={`text-xl font-bold mb-1 uppercase ${textColor}`}>{isSignUp ? 'Join Alpha Kids' : 'Login with HQ'}</h2>
        <p className="text-[10px] text-slate-500 font-semibold italic">{isSignUp ? 'Start your parenting journey' : 'Access your dashboard'}</p>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div className="space-y-3">
          <div className={`border-2 rounded-2xl p-3 focus-within:border-[#2A9D8F] transition-all ${inputBg}`}>
            <label className="block text-[8px] font-black text-[#2A9D8F] uppercase mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className={`w-full bg-transparent outline-none font-bold text-sm ${textColor}`} 
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`border-2 rounded-2xl p-3 focus-within:border-[#2A9D8F] transition-all relative ${inputBg}`}>
            <label className="block text-[8px] font-black text-[#2A9D8F] uppercase mb-1">Password</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              required
              className={`w-full bg-transparent outline-none font-bold text-sm ${textColor}`} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-3 text-slate-400 hover:text-[#2A9D8F]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-[#2A9D8F] text-white font-bold rounded-[1.2rem] shadow-xl text-base uppercase tracking-widest transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (isSignUp ? "Create HQ Account" : "Login to HQ")}
        </button>
      </form>

      <div className="text-center">
        <button 
          onClick={() => setStep(isSignUp ? 'EMAIL_SIGNIN' : 'EMAIL_SIGNUP')}
          className="text-[9px] font-black text-slate-500 uppercase tracking-widest"
        >
          {isSignUp ? 'Already an Alpha? ' : 'New here? '} 
          <span className="text-[#2A9D8F] underline">{isSignUp ? 'Sign In' : 'Join the Circle'}</span>
        </button>
      </div>
    </div>
  );

  const renderSocialLoading = () => (
    <div className={`flex-1 flex flex-col items-center justify-center space-y-6 p-8 animate-in zoom-in duration-500 ${isDarkMode ? 'bg-[#1A1C1E]' : ''}`}>
      <div className={`w-16 h-16 rounded-[1.5rem] shadow-xl border-4 flex items-center justify-center relative ${isDarkMode ? 'bg-[#24272B] border-[#2A9D8F]/20' : 'bg-white border-[#2A9D8F]/10'}`}>
         <Loader2 size={32} className="text-[#2A9D8F] animate-spin" />
      </div>
      <div className="text-center">
        <h3 className={`text-lg font-bold uppercase heading-condensed ${textColor}`}>Verifying Identity</h3>
        <p className="text-[10px] text-slate-500 font-semibold italic">Syncing with Secure Alpha Vault...</p>
      </div>
    </div>
  );

  return (
    <div className={`h-screen flex flex-col max-w-md mx-auto overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1C1E]' : 'bg-[#FAF9F6]'}`}>
      <div className={`relative ${step === 'ENTRY' ? 'h-[40%]' : 'h-[25%]'} bg-[#E9C46A] flex items-center justify-center overflow-hidden rounded-b-[4rem] transition-all duration-700 ease-in-out shadow-inner`}>
        <div className="absolute inset-0 opacity-10">
           <div className="grid grid-cols-6 gap-4 p-4 transform -rotate-12">
             {Array.from({length: 24}).map((_, i) => (
               <div key={i} className="w-12 h-12 bg-white rounded-xl"></div>
             ))}
           </div>
        </div>
        <div className="z-10 text-center px-8">
           <div className="w-14 h-14 bg-white rounded-[1.2rem] flex items-center justify-center mx-auto shadow-xl mb-3 transform rotate-3">
             <span className="text-xl font-bold text-[#2A9D8F]">EA</span>
           </div>
           {step === 'ENTRY' && (
             <div className="animate-in fade-in duration-1000">
               <h1 className="text-3xl font-bold text-[#264653] tracking-tighter">EASY ALPHA</h1>
               <p className="text-xs font-semibold text-[#264653]/60 italic">Parenting Headquarters</p>
             </div>
           )}
        </div>
      </div>

      {step === 'ENTRY' && renderEntry()}
      {step === 'OTP' && renderOtp()}
      {step === 'EMAIL_SIGNIN' && renderEmail(false)}
      {step === 'EMAIL_SIGNUP' && renderEmail(true)}
      {step === 'SOCIAL_LOADING' && renderSocialLoading()}
    </div>
  );
};

const SocialButton = ({ icon, isDarkMode, onClick }: { icon: React.ReactNode, isDarkMode: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-12 h-12 border-2 rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-90 ${isDarkMode ? 'bg-[#24272B] border-[#2F3338] hover:bg-[#2F3338]' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
  >
    {icon}
  </button>
);

export default Login;
