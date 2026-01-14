import { useEffect } from 'react';
import { TriangleAlert, Phone } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';
import SelectedUnitHeader from './SelectedUnitHeader';

interface IntercomWarningScreenProps {
  unit: string;
  onContinue: () => void;
  onBack: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Recording Notice',
    warning: 'This interaction will be recorded (audio and images).',
    info: 'By continuing, you acknowledge and consent to this recording.',
    continue: 'Continue Call',
    back: 'Back',
  },
  zh: {
    title: '錄製通知',
    warning: '此互動將被錄製（語音和影像）。',
    info: '繼續操作即表示您已知悉並同意此錄製。',
    continue: '繼續通話',
    back: '返回',
  },
  es: {
    title: 'Aviso de Grabación',
    warning: 'Esta interacción será grabada (audio e imágenes).',
    info: 'Al continuar, reconoces y consientes esta grabación.',
    continue: 'Continuar Llamada',
    back: 'Volver',
  },
};

/**
 * RECORDING NOTICE WITH INTEGRATED PHOTO CAPTURE
 * Displays recording disclosure while automatically capturing visitor photo in background.
 * Photo capture is non-blocking and requires no user interaction.
 */
export default function IntercomWarningScreen({ unit, onContinue, onBack, language }: IntercomWarningScreenProps) {
  const t = translations[language];

  useEffect(() => {
    // Automatically capture visitor photo in background (non-blocking)
    // In production, this would trigger camera capture without blocking UI
    // No visual feedback required - happens silently during notice display
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Selected Unit Header */}
      <SelectedUnitHeader unit={unit} language={language} />
      
      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-4xl">
          {/* Warning Icon */}
          <div className="w-48 h-48 rounded-full bg-amber-50 flex items-center justify-center">
            <TriangleAlert className="w-24 h-24 text-amber-600" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h2 className="text-5xl text-gray-900">{t.title}</h2>

          {/* Warning Message */}
          <div className="w-full px-12 py-8 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <p className="text-3xl text-amber-900 text-center mb-4">{t.warning}</p>
            <p className="text-xl text-amber-800 text-center">{t.info}</p>
          </div>
        </div>
      </div>

      {/* Centered Bottom Action Bar — NON-SESSION: 96px height, 360×72 buttons, 28px font, 24px gap */}
      <CenteredBottomActionBar
        secondaryButton={
          <button
            onClick={onBack}
            className="rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center active:bg-gray-50 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <span className="text-gray-900" style={{ fontSize: '28px' }}>{t.back}</span>
          </button>
        }
        primaryButton={
          <button
            onClick={onContinue}
            className="rounded-lg bg-blue-600 text-white flex items-center justify-center gap-3 active:bg-blue-700 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <Phone style={{ width: '28px', height: '28px' }} />
            <span style={{ fontSize: '28px' }}>{t.continue}</span>
          </button>
        }
      />
    </div>
  );
}