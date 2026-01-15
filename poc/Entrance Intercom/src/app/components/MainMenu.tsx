import { Package, Phone, Mic, Globe } from 'lucide-react';
import { FlowType, Language, IdleToHomeTransitionStyle } from '../App';
import { useState, useEffect } from 'react';

interface MainMenuProps {
  onFlowSelect: (flow: FlowType) => void;
  onLanguageToggle: () => void;
  onBack: () => void;
  language: Language;
  transitionStyle: IdleToHomeTransitionStyle;
}

const translations = {
  en: {
    title: 'How can we help you?',
    delivery: 'Delivery',
    intercom: 'Intercom',
    voiceMessage: 'Voice Message',
  },
  zh: {
    title: '您需要什麼服務？',
    delivery: '投遞',
    intercom: '對講',
    voiceMessage: '語音留言',
  },
  es: {
    title: '¿Cómo podemos ayudarte?',
    delivery: 'Entrega',
    intercom: 'Intercomunicador',
    voiceMessage: 'Mensaje de Voz',
  },
};

export default function MainMenu({ onFlowSelect, onLanguageToggle, onBack, language, transitionStyle }: MainMenuProps) {
  const t = translations[language];
  const [isEntering, setIsEntering] = useState(true);

  // Trigger enter animation on mount
  useEffect(() => {
    // Start with entering state
    setIsEntering(true);
    
    // Remove entering state after animation completes
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 240);
    
    return () => clearTimeout(timer);
  }, []);

  const menuItems: { flow: FlowType; icon: typeof Package; label: string }[] = [
    { flow: 'delivery', icon: Package, label: t.delivery },
    { flow: 'intercom', icon: Phone, label: t.intercom },
    { flow: 'voice-message', icon: Mic, label: t.voiceMessage },
  ];

  // Dynamic class name based on transition style
  const enterClassName = isEntering 
    ? transitionStyle === 'A' 
      ? 'main-menu-enter-a' 
      : transitionStyle === 'B'
      ? 'main-menu-enter-b'
      : 'main-menu-enter-c'
    : '';

  return (
    <div className={`w-full h-full flex flex-col bg-white ${enterClassName}`}>
      {/* Optional highlight sweep overlay for Option A */}
      {isEntering && transitionStyle === 'A' && (
        <div 
          className="highlight-sweep"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0) 100%)',
            pointerEvents: 'none',
            zIndex: 50,
            animation: 'highlight-fade-out 280ms ease-out forwards',
          }}
        />
      )}

      {/* Header - 3-column layout to prevent GlobalLogo overlap */}
      <div 
        className="flex items-center border-b border-gray-200"
        style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '32px', paddingBottom: '32px' }}
      >
        {/* Left: Spacer for GlobalLogo (64px) + gap (16px) */}
        <div style={{ width: '80px', flexShrink: 0 }} />
        
        {/* Center: Title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-4xl text-gray-900">{t.title}</h1>
        </div>
        
        {/* Right: Language button (actual button, not spacer) */}
        <div style={{ width: '64px', flexShrink: 0 }} className="flex justify-end">
          <button
            onClick={onLanguageToggle}
            className="w-16 h-16 rounded-lg flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <Globe className="w-8 h-8 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Menu Items - Full Content Height */}
      <div className="flex-1 flex items-center justify-center px-16 gap-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.flow}
              onClick={() => onFlowSelect(item.flow)}
              className="flex-1 h-80 bg-gray-50 rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center gap-6 active:border-blue-600 active:bg-blue-50 transition-all"
            >
              <Icon className="w-24 h-24 text-gray-700" strokeWidth={1.5} />
              <span className="text-3xl text-gray-900">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Enter animation styles - embedded */}
      <style>{`
        /* ===== OPTION A: Crossfade + subtle settle scale (most premium) ===== */
        .main-menu-enter-a {
          animation: main-menu-fade-scale-in 240ms ease-out forwards;
        }

        @keyframes main-menu-fade-scale-in {
          0% {
            opacity: 0.0;
            transform: scale(0.985);
          }
          100% {
            opacity: 1.0;
            transform: scale(1.00);
          }
        }

        @keyframes highlight-fade-out {
          0% {
            opacity: 0.10;
          }
          100% {
            opacity: 0.00;
          }
        }

        /* ===== OPTION B: Crossfade + short upward motion (clean + dynamic) ===== */
        .main-menu-enter-b {
          animation: main-menu-fade-slide-in 240ms ease-out forwards;
        }

        @keyframes main-menu-fade-slide-in {
          0% {
            opacity: 0.0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1.0;
            transform: translateY(0px);
          }
        }

        /* ===== OPTION C: Crossfade + blur-to-sharp reveal (high-end, cinematic) ===== */
        .main-menu-enter-c {
          animation: main-menu-fade-blur-in 240ms ease-out forwards;
        }

        @keyframes main-menu-fade-blur-in {
          0% {
            opacity: 0.0;
            filter: blur(6px);
          }
          100% {
            opacity: 1.0;
            filter: blur(0px);
          }
        }

        /* ===== Accessibility: Disable animations if user prefers reduced motion ===== */
        @media (prefers-reduced-motion: reduce) {
          .main-menu-enter-a,
          .main-menu-enter-b,
          .main-menu-enter-c {
            animation: main-menu-fade-in-reduced 150ms ease-out forwards !important;
          }
          
          @keyframes main-menu-fade-in-reduced {
            0% {
              opacity: 0.0;
            }
            100% {
              opacity: 1.0;
            }
          }

          .highlight-sweep {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}