import { Building2 } from 'lucide-react';
import { Language, ConnectionStatus } from '../App';
import { useRef } from 'react';

interface IdleScreenProps {
  onTouch: () => void;
  onEnterSetup: () => void;
  language: Language;
  communityName: string | null;
  connectionStatus: ConnectionStatus;
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

export default function IdleScreen({ onTouch, onEnterSetup, language, communityName, connectionStatus }: IdleScreenProps) {
  const t = translations[language];
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  
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

  const handleClick = () => {
    onTouch();
  };

  // Show community name only when configured and online
  // Display just the name without any label prefix
  // Show placeholder "—" when not available
  const displayName = connectionStatus === 'online' && communityName 
    ? communityName 
    : '—';

  return (
    <div
      onClick={handleClick}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full h-full flex flex-col bg-white cursor-pointer"
    >
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
        
        <p className="text-xl text-gray-400">{t.tapToStart}</p>
      </div>
      
      {/* Privacy Warning - Bottom */}
      <div className="pb-12 px-12 max-w-4xl text-center mx-auto">
        <p className="text-lg text-gray-500">{t.warning}</p>
      </div>
    </div>
  );
}