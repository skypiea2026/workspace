import { useEffect } from 'react';
import { Camera, CircleAlert } from 'lucide-react';
import { Language } from '../App';
import SelectedUnitHeader from './SelectedUnitHeader';

interface PhotoCaptureScreenProps {
  unit: string;
  onComplete: () => void;
  language: Language;
}

const translations = {
  en: {
    capturing: 'Capturing photo...',
    notice: 'Image and audio recording in progress.',
  },
  zh: {
    capturing: '正在拍照...',
    notice: '正在進行影像與語音紀錄。',
  },
  es: {
    capturing: 'Capturando foto...',
    notice: 'Grabación de imagen y audio en progreso.',
  },
};

export default function PhotoCaptureScreen({ unit, onComplete, language }: PhotoCaptureScreenProps) {
  const t = translations[language];

  useEffect(() => {
    // Auto-advance after 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Selected Unit Header */}
      <SelectedUnitHeader unit={unit} language={language} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Camera Icon with Animation */}
          <div className="w-48 h-48 rounded-lg bg-gray-100 flex items-center justify-center">
            <Camera className="w-24 h-24 text-gray-500" strokeWidth={1.5} />
          </div>

          {/* Status Text */}
          <h2 className="text-4xl text-gray-900">{t.capturing}</h2>

          {/* Notice */}
          <div className="flex items-start gap-4 px-16 py-6 bg-amber-50 border border-amber-200 rounded-lg max-w-3xl">
            <CircleAlert className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <p className="text-xl text-amber-900">{t.notice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}