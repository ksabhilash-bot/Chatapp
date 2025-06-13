import React from 'react'

const AuthImagePattern = ({title, subtitle}) => {
  return (
    <div className='hidden lg:flex items-center justify-center bg-neutral-950 p-12 overflow-hidden relative'>
      {/* Bouncing balls container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-80">
          {/* Large bouncing balls */}
          <div className="absolute w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-bounce-slow shadow-lg shadow-amber-500/30" 
               style={{top: '10%', left: '20%', animationDelay: '0s'}}></div>
          
          <div className="absolute w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-bounce-medium shadow-lg shadow-blue-500/30" 
               style={{top: '60%', right: '15%', animationDelay: '0.5s'}}></div>
          
          <div className="absolute w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-bounce-fast shadow-lg shadow-emerald-500/30" 
               style={{bottom: '20%', left: '10%', animationDelay: '1s'}}></div>
          
          <div className="absolute w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-bounce-slow shadow-lg shadow-pink-500/30" 
               style={{top: '30%', right: '30%', animationDelay: '1.5s'}}></div>
          
          <div className="absolute w-10 h-10 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-full animate-bounce-medium shadow-lg shadow-violet-500/30" 
               style={{bottom: '40%', right: '40%', animationDelay: '2s'}}></div>
          
          <div className="absolute w-18 h-18 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-bounce-fast shadow-lg shadow-cyan-500/30" 
               style={{top: '50%', left: '50%', animationDelay: '0.8s'}}></div>
          
          {/* Small floating balls */}
          <div className="absolute w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-float shadow-md shadow-yellow-500/20" 
               style={{top: '15%', right: '10%', animationDelay: '0.3s'}}></div>
          
          <div className="absolute w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full animate-float shadow-md shadow-red-500/20" 
               style={{bottom: '10%', right: '20%', animationDelay: '1.2s'}}></div>
          
          <div className="absolute w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-float shadow-md shadow-green-500/20" 
               style={{top: '80%', left: '60%', animationDelay: '0.7s'}}></div>
          
          {/* Micro bouncing dots */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className={`absolute w-3 h-3 bg-white/60 rounded-full animate-bounce-micro shadow-sm`}
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random() * 1}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content overlay */}
      <div className="max-w-md text-center relative z-10 bg-neutral-950/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
        <div className="mb-8">
          {/* Animated icon/logo area */}
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-zinc-500 rounded-full animate-spin-slow opacity-20"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-amber-50 animate-fade-in">{title}</h2>
        <p className="text-zinc-400 animate-fade-in-delay">{subtitle}</p>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-40px) scale(1.1);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        @keyframes bounce-medium {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-30px) scale(1.05);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        @keyframes bounce-fast {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-25px) scale(1.1);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        @keyframes bounce-micro {
          0%, 100% { 
            transform: translateY(0px);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-15px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        
        .animate-bounce-medium {
          animation: bounce-medium 2s infinite;
        }
        
        .animate-bounce-fast {
          animation: bounce-fast 1.5s infinite;
        }
        
        .animate-bounce-micro {
          animation: bounce-micro 1s infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .w-18 {
          width: 4.5rem;
          height: 4.5rem;
        }
      `}</style>
    </div>
  )
}

export default AuthImagePattern