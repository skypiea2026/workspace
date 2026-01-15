import { Building2 } from 'lucide-react';
import { Language, ConnectionStatus, IdleToHomeTransitionStyle } from '../App';
import { useRef, useState, useEffect } from 'react';

interface IdleScreenProps {
  onTouch: () => void;
  onEnterSetup: () => void;
  language: Language;
  communityName: string | null;
  connectionStatus: ConnectionStatus;
  isEntering?: boolean;
  transitionStyle?: IdleToHomeTransitionStyle;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
}

const translations = {
  en: {
    community: 'Riverside Community',
    tapToStart: 'Tap anywhere to start',
    warning: 'This device records image and audio during operation.',
  },
  zh: {
    community: '河濱社區',
    tapToStart: '點擊螢幕開始',
    warning: '本設備於操作過程中將進行影像與語音紀錄。',
  },
  es: {
    community: 'Comunidad Riverside',
    tapToStart: 'Toca en cualquier lugar para comenzar',
    warning: 'Este dispositivo graba imagen y audio durante el funcionamiento.',
  },
};

export default function IdleScreen({ onTouch, onEnterSetup, language, communityName, connectionStatus, isEntering, transitionStyle }: IdleScreenProps) {
  const t = translations[language];
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const rippleIdCounter = useRef(0);
  
  const now = new Date();
  const time = now.toLocaleTimeString(language === 'zh' ? 'zh-TW' : language === 'es' ? 'es-ES' : 'en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const date = now.toLocaleDateString(language === 'zh' ? 'zh-TW' : language === 'es' ? 'es-ES' : 'en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      onEnterSetup();
    }, 3000); // 3 second long press
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Create ripple effect at tap point
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rippleId = rippleIdCounter.current++;
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 220);
    
    // Trigger exit animation
    setIsExiting(true);
    
    // Call onTouch after brief delay to allow exit animation to start
    setTimeout(() => {
      onTouch();
    }, 0);
  };

  // Show community name only when configured and online
  // Display just the name without any label prefix
  // Show placeholder "—\" when not available
  const displayName = connectionStatus === 'online' && communityName 
    ? communityName 
    : '—';

  // Dynamic class name based on transition style when entering from another screen
  const enterClassName = isEntering 
    ? transitionStyle === 'A' 
      ? 'idle-enter-a' 
      : transitionStyle === 'B'
      ? 'idle-enter-b'
      : transitionStyle === 'C'
      ? 'idle-enter-c'
      : ''
    : '';

  return (
    <div
      onClick={handleClick}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`w-full h-full flex flex-col bg-white cursor-pointer relative ${isExiting ? 'idle-exit' : ''} ${enterClassName}`}
    >
      {/* Tap Ripple Effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="tap-ripple"
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: '400px',
            height: '400px',
            marginLeft: '-200px',
            marginTop: '-200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.20) 0%, rgba(59, 130, 246, 0) 70%)',
            pointerEvents: 'none',
            animation: 'ripple-expand 220ms ease-out forwards',
            zIndex: 10,
          }}
        />
      ))}

      {/* Community Name Area - Top */}
      <div 
        className="flex flex-col items-center border-b border-gray-100"
        style={{ paddingTop: '32px', paddingBottom: '24px' }}
      >
        <h2 className="text-2xl text-gray-900">{displayName}</h2>
      </div>

      {/* Main Content - Centered */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-48 h-48 rounded-full bg-gray-50 flex items-center justify-center mb-8">
          <Building2 className="w-24 h-24 text-gray-300" strokeWidth={1.5} />
        </div>
        
        <div className="text-7xl font-light text-gray-900 mb-2">{time}</div>
        <div className="text-2xl text-gray-500 mb-16">{date}</div>
        
        <p 
          className="text-xl text-gray-400 animate-breathe"
          style={{
            animation: 'breathe 1.8s ease-in-out infinite alternate',
          }}
        >
          {t.tapToStart}
        </p>
      </div>
      
      {/* Privacy Warning - Bottom */}
      <div className="pb-12 px-12 max-w-4xl text-center mx-auto">
        <p className="text-lg text-gray-500">{t.warning}</p>
      </div>

      {/* Animation styles - embedded */}
      <style>{`
        @keyframes breathe {
          0% {
            opacity: 0.25;
            transform: scale(1.00);
          }
          100% {
            opacity: 1.0;
            transform: scale(1.02);
          }
        }

        @keyframes ripple-expand {
          0% {
            transform: scale(0.6);
            opacity: 0.20;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        /* Exit animation for Idle screen */
        .idle-exit {
          animation: idle-fade-blur-out 160ms ease-in forwards;
        }

        @keyframes idle-fade-blur-out {
          0% {
            opacity: 1.0;
            filter: blur(0px);
          }
          100% {
            opacity: 0.0;
            filter: blur(6px);
          }
        }

        /* ===== ENTER ANIMATIONS (Any Screen → Idle) ===== */
        
        /* Option A: Fade + subtle settle scale (calm & ready) */
        .idle-enter-a {
          opacity: 0;
          animation: idle-fade-scale-in 210ms ease-out forwards;
        }

        @keyframes idle-fade-scale-in {
          0% {
            opacity: 0.0;
            transform: scale(0.99);
          }
          100% {
            opacity: 1.0;
            transform: scale(1.00);
          }
        }

        /* Option B: Fade + short upward motion (clean directional) */
        .idle-enter-b {
          opacity: 0;
          animation: idle-fade-slide-in 210ms ease-out forwards;
        }

        @keyframes idle-fade-slide-in {
          0% {
            opacity: 0.0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1.0;
            transform: translateY(0px);
          }
        }

        /* Option C: Fade + blur-to-sharp (cinematic) */
        .idle-enter-c {
          opacity: 0;
          animation: idle-fade-blur-in 210ms ease-out forwards;
        }

        @keyframes idle-fade-blur-in {
          0% {
            opacity: 0.0;
            filter: blur(4px);
          }
          100% {
            opacity: 1.0;
            filter: blur(0px);
          }
        }

        /* Accessibility: Disable animations if user prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-breathe {
            animation: none !important;
            opacity: 1.0 !important;
            transform: none !important;
          }
          
          .tap-ripple {
            display: none !important;
          }
          
          .idle-exit {
            animation: idle-fade-out-reduced 120ms ease-in forwards !important;
          }
          
          @keyframes idle-fade-out-reduced {
            0% {
              opacity: 1.0;
            }
            100% {
              opacity: 0.0;
            }
          }

          /* Disable all enter animations, use simple fade */
          .idle-enter-a,
          .idle-enter-b,
          .idle-enter-c {
            animation: idle-fade-in-reduced 150ms ease-out forwards !important;
          }

          @keyframes idle-fade-in-reduced {
            0% {
              opacity: 0.0;
            }
            100% {
              opacity: 1.0;
            }
          }
        }
      `}</style>
    </div>
  );
}