import { useEffect, useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface UploadSuccessScreenProps {
  onDone: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Upload Complete',
    message: 'Settings uploaded successfully.',
    done: 'Done',
    countdown: (seconds: number) => `Automatically returning to Idle screen in ${seconds} second${seconds !== 1 ? 's' : ''}`,
  },
  zh: {
    title: '上傳完成',
    message: '設定已成功上傳。',
    done: '完成',
    countdown: (seconds: number) => `將於 ${seconds} 秒後自動返回待機畫面`,
  },
  es: {
    title: 'Subida Completa',
    message: 'Configuración subida exitosamente.',
    done: 'Hecho',
    countdown: (seconds: number) => `Regresando automáticamente en ${seconds} segundo${seconds !== 1 ? 's' : ''}`,
  },
};

/**
 * UPLOAD SUCCESS SCREEN — NON-SESSION
 * - Shows after settings upload completes successfully
 * - Auto-returns to Idle after 10 seconds
 * - User can tap "Done" to return immediately (cancels countdown)
 * - Follows non-session bottom action rules: 96px area, 360×72 button, 28px font
 */
export default function UploadSuccessScreen({ onDone, language }: UploadSuccessScreenProps) {
  const t = translations[language];
  const [countdown, setCountdown] = useState(10);

  // Handle countdown reaching 0
  useEffect(() => {
    if (countdown === 0) {
      onDone();
    }
  }, [countdown, onDone]);

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

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-4xl">
          {/* Success Icon */}
          <div className="w-48 h-48 rounded-full bg-green-50 flex items-center justify-center">
            <CircleCheck className="w-24 h-24 text-green-600" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h2 className="text-5xl text-gray-900">{t.title}</h2>

          {/* Message */}
          <p className="text-3xl text-gray-700 text-center">{t.message}</p>

          {/* Countdown Helper Text */}
          <p className="text-xl text-gray-500 text-center">
            {t.countdown(countdown)}
          </p>
        </div>
      </div>

      {/* Centered Bottom Action Bar — NON-SESSION (SINGLE BUTTON): 96px height, 360×72 button, 28px font */}
      <CenteredBottomActionBar
        primaryButton={
          <button
            onClick={onDone}
            className="rounded-lg bg-blue-600 text-white flex items-center justify-center active:bg-blue-700 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <span style={{ fontSize: '28px' }}>{t.done}</span>
          </button>
        }
      />
    </div>
  );
}