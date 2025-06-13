import React from 'react';

const BackgroundBubbles = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-6 h-6 rounded-full bg-zinc-100 opacity-50 animate-bounce-slow`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              top: `${Math.random() * 100 + 10}px`
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-100px); }
        }

        .animate-bounce-slow {
          animation-name: bounceSlow;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default React.memo(BackgroundBubbles);
