import { useEffect, useState, useRef } from 'react';
import { Info } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface NoResponseScreenProps {
  onReturnToIdle: () => void;
  language: Language;
  isExiting?: boolean;
}

const translations = {
  en: {
    title: 'Session Complete',
    message: 'Your request has been processed.',
    info: 'The resident may respond at a later time.',
    return: 'Return to Home',
    countdown: (seconds: number) => `Automatically returning to Idle screen in ${seconds} second${seconds !== 1 ? 's' : ''}`,
  },
  zh: {
    title: '會話結束',
    message: '您的請求已處理。',
    info: '住戶可能稍後回應。',
    return: '返回主畫面',
    countdown: (seconds: number) => `將於 ${seconds} 秒後自動返回待機畫面`,
  },
  es: {
    title: 'Sesión Completada',
    message: 'Su solicitud ha sido procesada.',
    info: 'El residente puede responder más tarde.',
    return: 'Volver al Inicio',
    countdown: (seconds: number) => `Regresando automáticamente en ${seconds} segundo${seconds !== 1 ? 's' : ''}`,
  },
};

export default function NoResponseScreen({ onReturnToIdle, language, isExiting }: NoResponseScreenProps) {
  const t = translations[language];
  const [countdown, setCountdown] = useState(10);
  const [isAutoClosing, setIsAutoClosing] = useState(false);
  
  // Single-fire guard for auto-return
  const isAutoReturningRef = useRef(false);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Unified return function used by BOTH manual and auto paths
  const returnToIdle = (source: 'manual' | 'auto') => {
    // Guard: prevent double-triggering
    if (isAutoReturningRef.current) {
      return;
    }
    
    // Set guard flag
    isAutoReturningRef.current = true;
    
    // Clear countdown timer immediately
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    
    if (source === 'auto') {
      // Auto-return: apply subtle closing feel before navigation
      setIsAutoClosing(true);
      
      // Wait for closing animation (120ms) before navigating
      setTimeout(() => {
        onReturnToIdle();
      }, 120);
    } else {
      // Manual return: immediate navigation
      onReturnToIdle();
    }
  };

  // Handle countdown reaching 0
  useEffect(() => {
    if (countdown === 0 && !isAutoReturningRef.current) {
      returnToIdle('auto');
    }
  }, [countdown]);

  useEffect(() => {
    // Clear any existing timer before starting new one
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
    
    // Start countdown timer
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount - clear timer
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    };
  }, []);

  const handleReturnNow = () => {
    // User requested immediate return - use unified function
    returnToIdle('manual');
  };

  return (
    <div className={`w-full h-full flex flex-col bg-white relative ${isExiting ? 'screen-exit' : ''} ${isAutoClosing ? 'screen-auto-closing' : ''}`}>
      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-4xl">
          {/* Icon */}
          <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center">
            <Info className="w-24 h-24 text-gray-500" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h2 className="text-5xl text-gray-900">{t.title}</h2>

          {/* Message */}
          <p className="text-3xl text-gray-700 text-center">{t.message}</p>

          {/* Countdown Helper Text */}
          <p className="text-xl text-gray-500 text-center">
            {t.countdown(countdown)}
          </p>

          {/* Info */}
          <div className="px-8 py-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xl text-gray-600 text-center">{t.info}</p>
          </div>
        </div>
      </div>

      {/* Centered Bottom Action Bar — NON-SESSION (SINGLE BUTTON): 96px height, 360×72 button, 28px font */}
      <CenteredBottomActionBar
        primaryButton={
          <button
            onClick={handleReturnNow}
            className="rounded-lg bg-blue-600 text-white flex items-center justify-center active:bg-blue-700 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <span style={{ fontSize: '28px' }}>{t.return}</span>
          </button>
        }
      />

      {/* Auto-closing animation style - embedded */}
      <style>{`
        .screen-auto-closing {
          animation: auto-close-fade 120ms ease-in forwards;
        }

        @keyframes auto-close-fade {
          0% {
            opacity: 1.0;
          }
          100% {
            opacity: 0.7;
          }
        }

        /* Accessibility: Disable animation if user prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .screen-auto-closing {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}