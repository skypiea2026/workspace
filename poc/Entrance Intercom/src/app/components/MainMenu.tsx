import { Package, Phone, Mic, Globe } from 'lucide-react';
import { FlowType, Language } from '../App';

interface MainMenuProps {
  onFlowSelect: (flow: FlowType) => void;
  onLanguageToggle: () => void;
  onBack: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'How can we help you?',
    delivery: 'Delivery',
    intercom: 'Intercom',
    voiceMessage: 'Voice Message',
  },
  zh: {
    title: '您需要什麼服務？',
    delivery: '投遞',
    intercom: '對講',
    voiceMessage: '語音留言',
  },
  es: {
    title: '¿Cómo podemos ayudarte?',
    delivery: 'Entrega',
    intercom: 'Intercomunicador',
    voiceMessage: 'Mensaje de Voz',
  },
};

export default function MainMenu({ onFlowSelect, onLanguageToggle, onBack, language }: MainMenuProps) {
  const t = translations[language];

  const menuItems: { flow: FlowType; icon: typeof Package; label: string }[] = [
    { flow: 'delivery', icon: Package, label: t.delivery },
    { flow: 'intercom', icon: Phone, label: t.intercom },
    { flow: 'voice-message', icon: Mic, label: t.voiceMessage },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header - 3-column layout to prevent GlobalLogo overlap */}
      <div 
        className="flex items-center border-b border-gray-200"
        style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '32px', paddingBottom: '32px' }}
      >
        {/* Left: Spacer for GlobalLogo (64px) + gap (16px) */}
        <div style={{ width: '80px', flexShrink: 0 }} />
        
        {/* Center: Title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-4xl text-gray-900">{t.title}</h1>
        </div>
        
        {/* Right: Language button (actual button, not spacer) */}
        <div style={{ width: '64px', flexShrink: 0 }} className="flex justify-end">
          <button
            onClick={onLanguageToggle}
            className="w-16 h-16 rounded-lg flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <Globe className="w-8 h-8 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Menu Items - Full Content Height */}
      <div className="flex-1 flex items-center justify-center px-16 gap-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.flow}
              onClick={() => onFlowSelect(item.flow)}
              className="flex-1 h-80 bg-gray-50 rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center gap-6 active:border-blue-600 active:bg-blue-50 transition-all"
            >
              <Icon className="w-24 h-24 text-gray-700" strokeWidth={1.5} />
              <span className="text-3xl text-gray-900">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}