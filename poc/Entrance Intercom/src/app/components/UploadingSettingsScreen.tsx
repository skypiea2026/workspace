import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Language } from '../App';

interface UploadingSettingsScreenProps {
  language: Language;
  onUploadComplete: (communityName: string) => void;
  onUploadFailed: () => void;
}

const translations = {
  en: {
    title: 'Uploading…',
    message: 'Uploading settings… Please wait.',
    warning: 'Do not power off or close the device.',
  },
  zh: {
    title: '上傳中…',
    message: '正在上傳設定… 請稍候。',
    warning: '請勿關閉裝置或離開畫面。',
  },
  es: {
    title: 'Subiendo…',
    message: 'Subiendo configuración… Espere por favor.',
    warning: 'No apague ni cierre el dispositivo.',
  },
};

/**
 * UPLOADING SETTINGS SCREEN — BLOCKING STATE
 * - Shows immediately after tapping Save on Settings
 * - No navigation controls (no back button, no home icon)
 * - User must wait for upload to complete
 * - Simulates upload process and navigates to success/failure screens
 */
export default function UploadingSettingsScreen({ 
  language, 
  onUploadComplete, 
  onUploadFailed 
}: UploadingSettingsScreenProps) {
  const t = translations[language];

  useEffect(() => {
    // Simulate upload process (2-3 seconds)
    // In production, this would be an actual API call to backend
    const uploadTimer = setTimeout(() => {
      // 90% success rate for demo purposes
      // In production, handle actual network responses
      const uploadSuccess = Math.random() > 0.1;
      
      if (uploadSuccess) {
        // Simulate receiving community name from backend
        // In production, this would come from the actual API response
        const mockCommunityName = 'Riverside Gardens Community';
        onUploadComplete(mockCommunityName);
      } else {
        onUploadFailed();
      }
    }, 2500); // 2.5 seconds upload simulation

    return () => clearTimeout(uploadTimer);
  }, [onUploadComplete, onUploadFailed]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-8 max-w-4xl px-16">
        {/* Loading Spinner */}
        <div className="w-48 h-48 rounded-full bg-blue-50 flex items-center justify-center">
          <Loader2 className="w-24 h-24 text-blue-600 animate-spin" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-5xl text-gray-900">{t.title}</h2>

        {/* Primary Message */}
        <p className="text-3xl text-gray-700 text-center">{t.message}</p>

        {/* Warning Message */}
        <div className="px-12 py-6 bg-amber-50 rounded-lg border-2 border-amber-200">
          <p className="text-xl text-amber-900 text-center">{t.warning}</p>
        </div>
      </div>
    </div>
  );
}