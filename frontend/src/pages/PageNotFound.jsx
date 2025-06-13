import { useState, useEffect } from 'react';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';

export default function PageNotFound() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [glitchText, setGlitchText] = useState('404');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      const glitchChars = ['4', '0', '4', '?', '!', '#', '@', '%'];
      const randomText = Array.from({ length: 3 }, () => 
        glitchChars[Math.floor(Math.random() * glitchChars.length)]
      ).join('');
      setGlitchText(randomText);
      
      setTimeout(() => {
        setGlitchText('404');
        setIsAnimating(false);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-400 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        ></div>
      ))}

      <div className="text-center z-10 max-w-2xl mx-auto">
        {/* 404 Number with glitch effect */}
        <div className="relative mb-8">
          <h1 
            className={`text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-100 select-none transition-all duration-200 ${
              isAnimating ? 'transform scale-110 rotate-1' : ''
            }`}
            style={{ 
              textShadow: '0 0 30px rgba(113, 113, 122, 0.5)',

              filter: isAnimating ? 'hue-rotate(180deg)' : 'none'
            }}
          >
            {glitchText}
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-white opacity-10 blur-sm -z-10">
            404
          </div>
        </div>

        {/* Main message */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fadeIn">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto leading-relaxed animate-fadeIn animation-delay-500">
            The page you're looking for has vanished into the digital void. 
            Don't worry, even the best explorers sometimes take wrong turns.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn animation-delay-1000">
          <button
            onClick={handleGoHome}
            className="group flex items-center gap-3 bg-gradient-to-r from-zinc-600 to-zinc-300 hover:from-green-500 hover:to-green-200 text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Go Home
          </button>
          
          <button
            onClick={handleGoBack}
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/30"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <button
            onClick={handleRefresh}
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/30"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Refresh
          </button>
        </div>

        
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}