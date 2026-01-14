import { useEffect, useState } from 'react';
import { Package, Clock, LockOpen } from 'lucide-react';
import { Language } from '../App';
import SelectedUnitHeader from './SelectedUnitHeader';

interface DeliveryWaitingScreenProps {
  unit: string;
  onComplete: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Notification Sent',
    message: (unit: string) => `Unit ${unit} has been notified. Please wait.`,
    info: 'They will be down shortly or may unlock the door remotely.',
    unlocked: 'Resident has unlocked the door. Please enter to deliver.',
    safetyNotice: 'Please close the door when leaving. Thank you.',
  },
  zh: {
    title: '通知已發送',
    message: (unit: string) => `${unit} 住戶已收到通知，請稍候。`,
    info: '對方將很快下來或遠端開門。',
    unlocked: '住戶已解鎖，請入內投遞。',
    safetyNotice: '離開時請將門帶上，謝謝。',
  },
  es: {
    title: 'Notificación Enviada',
    message: (unit: string) => `La Unidad ${unit} ha sido notificada. Por favor espere.`,
    info: 'Bajarán en breve o podrán abrir la puerta de forma remota.',
    unlocked: 'El residente ha desbloqueado la puerta. Puede entrar a entregar.',
    safetyNotice: 'Por favor cierre la puerta al salir. Gracias.',
  },
};

export default function DeliveryWaitingScreen({ unit, onComplete, language }: DeliveryWaitingScreenProps) {
  const t = translations[language];
  const [doorUnlocked, setDoorUnlocked] = useState(false);

  useEffect(() => {
    // Auto-complete after 30 seconds (simulating timeout)
    const timer = setTimeout(() => {
      onComplete();
    }, 30000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Simulate door unlock after 8 seconds (for demo purposes)
  useEffect(() => {
    const unlockTimer = setTimeout(() => {
      setDoorUnlocked(true);
    }, 8000);

    return () => clearTimeout(unlockTimer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Selected Unit Header */}
      <SelectedUnitHeader unit={unit} language={language} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-4xl">
          {/* Icon */}
          <div className="w-48 h-48 rounded-full bg-blue-50 flex items-center justify-center">
            <Package className="w-24 h-24 text-blue-600" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h2 className="text-5xl text-gray-900">{t.title}</h2>

          {/* Message */}
          <p className="text-3xl text-gray-700 text-center">{t.message(unit)}</p>

          {/* Unlock Status Indicator - Only visible when unlocked */}
          {doorUnlocked && (
            <div className="flex flex-col gap-2 px-6 py-4 pointer-events-none">
              {/* Main unlock message with icon */}
              <div className="flex items-center gap-3">
                <LockOpen className="w-10 h-10 text-green-600 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-2xl text-green-700" style={{ fontWeight: 500 }}>{t.unlocked}</p>
              </div>
              {/* Safety notice - smaller, lower emphasis */}
              <div className="flex items-start" style={{ paddingLeft: '52px' }}>
                <p className="text-lg text-gray-500">{t.safetyNotice}</p>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex items-center gap-4 px-8 py-6 bg-gray-50 rounded-lg border border-gray-200">
            <Clock className="w-8 h-8 text-gray-500" />
            <p className="text-xl text-gray-600">{t.info}</p>
          </div>
        </div>
      </div>
    </div>
  );
}