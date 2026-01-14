import { WifiOff, Wifi, Loader2 } from 'lucide-react';
import { Language, ConnectionStatus } from '../App';

interface ConnectionStatusBadgeProps {
  connectionStatus: ConnectionStatus;
  language: Language;
}

const translations = {
  en: {
    notConfigured: 'Not configured',
    offline: 'Offline',
    connecting: 'Connecting…',
    online: 'Online',
  },
  zh: {
    notConfigured: '尚未設定',
    offline: '未連線',
    connecting: '連線中…',
    online: '已連線',
  },
  es: {
    notConfigured: 'No configurado',
    offline: 'Fuera de línea',
    connecting: 'Conectando…',
    online: 'Conectado',
  },
};

export default function ConnectionStatusBadge({ 
  connectionStatus, 
  language,
}: ConnectionStatusBadgeProps) {
  const t = translations[language];

  // Determine badge appearance based on status
  const getBadgeStyle = () => {
    switch (connectionStatus) {
      case 'not-configured':
        return {
          label: t.notConfigured,
          icon: <WifiOff className="w-3.5 h-3.5" />,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
        };
      case 'offline':
        return {
          label: t.offline,
          icon: <WifiOff className="w-3.5 h-3.5" />,
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
        };
      case 'online':
        return {
          label: t.online,
          icon: <Wifi className="w-3.5 h-3.5" />,
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
        };
      default:
        // Fail-safe: default to offline/connecting
        return {
          label: t.connecting,
          icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
        };
    }
  };

  const style = getBadgeStyle();

  // For online status, show icon-only variant (less prominent)
  const isOnline = connectionStatus === 'online';

  return (
    <div
      className={`
        absolute bottom-4 right-4 z-40
        flex items-center gap-2
        px-3 py-2
        rounded-full
        border
        pointer-events-none
        ${style.bgColor}
        ${style.textColor}
        ${style.borderColor}
      `}
      style={{
        fontSize: '13px',
        height: '32px',
        minWidth: isOnline ? '32px' : 'auto',
      }}
      aria-label={style.label}
      role="status"
      aria-live="polite"
    >
      {style.icon}
      {!isOnline && (
        <span className="whitespace-nowrap">{style.label}</span>
      )}
    </div>
  );
}