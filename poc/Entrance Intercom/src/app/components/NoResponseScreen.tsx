import { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface NoResponseScreenProps {
  onReturnToIdle: () => void;
  language: Language;
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

export default function NoResponseScreen({ onReturnToIdle, language }: NoResponseScreenProps) {
  const t = translations[language];
  const [countdown, setCountdown] = useState(10);

  // Handle countdown reaching 0
  useEffect(() => {
    if (countdown === 0) {
      onReturnToIdle();
    }
  }, [countdown, onReturnToIdle]);

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const handleReturnNow = () => {
    // User requested immediate return
    onReturnToIdle();
  };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
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
    </div>
  );
}