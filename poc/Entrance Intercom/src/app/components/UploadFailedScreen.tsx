import { CircleX, ChevronLeft, RotateCcw } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface UploadFailedScreenProps {
  onBack: () => void;
  onRetry: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Upload Failed',
    message: 'Network error. Please try again.',
    back: 'Back',
    retry: 'Retry',
  },
  zh: {
    title: '上傳失敗',
    message: '網路異常，請再試一次。',
    back: '返回',
    retry: '重試',
  },
  es: {
    title: 'Subida Fallida',
    message: 'Error de red. Por favor, inténtalo de nuevo.',
    back: 'Volver',
    retry: 'Reintentar',
  },
};

/**
 * UPLOAD FAILED SCREEN — NON-SESSION
 * - Shows when settings upload fails due to network error
 * - Provides Back and Retry options
 * - Follows non-session bottom action rules: 96px area, 360×72 buttons, 28px font, 24px gap
 */
export default function UploadFailedScreen({ onBack, onRetry, language }: UploadFailedScreenProps) {
  const t = translations[language];

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-4xl">
          {/* Error Icon */}
          <div className="w-48 h-48 rounded-full bg-red-50 flex items-center justify-center">
            <CircleX className="w-24 h-24 text-red-600" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h2 className="text-5xl text-gray-900">{t.title}</h2>

          {/* Message */}
          <div className="w-full px-12 py-8 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-3xl text-red-900 text-center">{t.message}</p>
          </div>
        </div>
      </div>

      {/* Centered Bottom Action Bar — NON-SESSION: 96px height, 360×72 buttons, 28px font, 24px gap */}
      <CenteredBottomActionBar
        secondaryButton={
          <button
            onClick={onBack}
            className="rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center gap-3 active:bg-gray-50 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <ChevronLeft style={{ width: '28px', height: '28px' }} className="text-gray-700" />
            <span className="text-gray-900" style={{ fontSize: '28px' }}>{t.back}</span>
          </button>
        }
        primaryButton={
          <button
            onClick={onRetry}
            className="rounded-lg bg-blue-600 text-white flex items-center justify-center gap-3 active:bg-blue-700 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <RotateCcw style={{ width: '28px', height: '28px' }} />
            <span style={{ fontSize: '28px' }}>{t.retry}</span>
          </button>
        }
      />
    </div>
  );
}
