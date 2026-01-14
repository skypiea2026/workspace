import { Settings } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface EnterSetupModeScreenProps {
  onContinue: () => void;
  onCancel: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Device Setup Mode',
    subtitle: 'Administrator access required',
    warning: 'Strict warning: Unauthorized access is prohibited. Site management will be notified and the police will be contacted. All actions are logged.',
    cancel: 'Cancel',
    continue: 'Continue',
  },
  zh: {
    title: '裝置設定模式',
    subtitle: '需要管理員權限',
    warning: '嚴正警告：未經授權禁止進入。系統將立即通報管理中心並聯繫警方，所有操作皆留存紀錄。',
    cancel: '取消',
    continue: '繼續',
  },
  es: {
    title: 'Modo de configuración',
    subtitle: 'Se requiere acceso de administrador',
    warning: 'Advertencia estricta: Se prohíbe el acceso no autorizado. Se notificará a la administración y se contactará a la policía. Todas las acciones quedan registradas.',
    cancel: 'Cancelar',
    continue: 'Continuar',
  },
};

export default function EnterSetupModeScreen({ onContinue, onCancel, language }: EnterSetupModeScreenProps) {
  const t = translations[language];

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-5xl">
          {/* Icon */}
          <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="w-24 h-24 text-gray-600" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h1 className="text-5xl text-gray-900">{t.title}</h1>

          {/* Subtitle */}
          <p className="text-2xl text-gray-600">{t.subtitle}</p>

          {/* Warning Box - Prominent Security Warning */}
          <div 
            className="w-full px-10 py-8 bg-red-50 border-2 border-red-300 rounded-lg"
            style={{ marginTop: '24px' }}
          >
            <p className="text-xl text-red-700 text-center leading-relaxed">
              {t.warning}
            </p>
          </div>
        </div>
      </div>

      {/* Centered Bottom Action Bar — NON-SESSION: 96px height, 360×72 buttons, 28px font, 24px gap */}
      <CenteredBottomActionBar
        secondaryButton={
          <button
            onClick={onCancel}
            className="rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center active:bg-gray-50 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <span className="text-gray-900" style={{ fontSize: '28px' }}>{t.cancel}</span>
          </button>
        }
        primaryButton={
          <button
            onClick={onContinue}
            className="rounded-lg bg-blue-600 text-white flex items-center justify-center active:bg-blue-700 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <span style={{ fontSize: '28px' }}>{t.continue}</span>
          </button>
        }
      />
    </div>
  );
}