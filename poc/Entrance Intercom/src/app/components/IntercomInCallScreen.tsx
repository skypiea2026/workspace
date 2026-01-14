import { useState, useEffect } from 'react';
import { PhoneOff, LockOpen, Lock } from 'lucide-react';
import { Language } from '../App';
import BottomControlBar from './BottomControlBar';
import SelectedUnitHeader from './SelectedUnitHeader';

interface IntercomInCallScreenProps {
  unit: string;
  onEnd: () => void;
  language: Language;
}

const translations = {
  en: {
    calling: (unit: string) => `Calling Unit ${unit}...`,
    connected: (unit: string) => `Connected to Unit ${unit}`,
    doorLocked: 'Door Locked',
    doorUnlocked: 'Door Unlocked',
    endCall: 'End Call',
    snapshotInfo: 'Image updates periodically',
    timeRemaining: 'Time remaining',
  },
  zh: {
    calling: (unit: string) => `正在呼叫 ${unit}...`,
    connected: (unit: string) => `已接通 ${unit}`,
    doorLocked: '門已鎖定',
    doorUnlocked: '門已解鎖',
    endCall: '結束通話',
    snapshotInfo: '畫面定期更新',
    timeRemaining: '剩餘時間',
  },
  es: {
    calling: (unit: string) => `Llamando a Unidad ${unit}...`,
    connected: (unit: string) => `Conectado a Unidad ${unit}`,
    doorLocked: 'Puerta Cerrada',
    doorUnlocked: 'Puerta Abierta',
    endCall: 'Finalizar Llamada',
    snapshotInfo: 'Imagen se actualiza periódicamente',
    timeRemaining: 'Tiempo restante',
  },
};

/**
 * INTERCOM SESSION - TIME LIMITS (HARD RULES)
 * Pre-Connect Timeout: 25 seconds (while connecting/ringing)
 * Connected Call Limit: 90 seconds (while in-call)
 * All end scenarios navigate directly to Session Ended page.
 */
export default function IntercomInCallScreen({ unit, onEnd, language }: IntercomInCallScreenProps) {
  const t = translations[language];
  
  // Session state
  const [callStatus, setCallStatus] = useState<'calling' | 'connected'>('calling');
  const [doorUnlocked, setDoorUnlocked] = useState(false);
  const [snapshotVersion, setSnapshotVersion] = useState(0);
  
  // Separate timers for pre-connect and connected states
  const [preConnectTimeLeft, setPreConnectTimeLeft] = useState(25); // 25 seconds to connect
  const [connectedTimeLeft, setConnectedTimeLeft] = useState(90); // 90 seconds max call duration

  // Pre-connect timer (only runs while calling)
  useEffect(() => {
    if (callStatus === 'calling' && preConnectTimeLeft > 0) {
      const timer = setInterval(() => {
        setPreConnectTimeLeft((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [callStatus, preConnectTimeLeft]);

  // Handle pre-connect timeout
  useEffect(() => {
    if (callStatus === 'calling' && preConnectTimeLeft === 0) {
      onEnd();
    }
  }, [callStatus, preConnectTimeLeft, onEnd]);

  // Connected call timer (only runs while connected)
  useEffect(() => {
    if (callStatus === 'connected' && connectedTimeLeft > 0) {
      const timer = setInterval(() => {
        setConnectedTimeLeft((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [callStatus, connectedTimeLeft]);

  // Handle connected timeout
  useEffect(() => {
    if (callStatus === 'connected' && connectedTimeLeft === 0) {
      onEnd();
    }
  }, [callStatus, connectedTimeLeft, onEnd]);

  // Update snapshot every 3-4 seconds when connected
  useEffect(() => {
    if (callStatus === 'connected') {
      const snapshotTimer = setInterval(() => {
        setSnapshotVersion((prev) => prev + 1);
      }, 3500); // 3.5 second intervals

      return () => clearInterval(snapshotTimer);
    }
  }, [callStatus]);

  // Simulate call connecting after 3 seconds (for demo)
  useEffect(() => {
    if (callStatus === 'calling') {
      const connectTimer = setTimeout(() => {
        setCallStatus('connected');
      }, 3000);

      return () => clearTimeout(connectTimer);
    }
  }, [callStatus]);

  // Simulate door unlock after 10 seconds
  useEffect(() => {
    if (callStatus === 'connected') {
      const unlockTimer = setTimeout(() => {
        setDoorUnlocked(true);
      }, 10000);

      return () => clearTimeout(unlockTimer);
    }
  }, [callStatus]);

  const handleManualEnd = () => {
    // User tapped End Call manually - navigate directly to Session Ended
    onEnd();
  };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* CONTENT AREA - Updates based on session state (clipped, cannot overlap control bar) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - 3-column layout to prevent GlobalLogo overlap */}
        <div 
          className="flex items-center border-b border-gray-200"
          style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '40px', paddingBottom: '40px' }}
        >
          {/* Left: Spacer for GlobalLogo (64px) + gap (16px) */}
          <div style={{ width: '80px', flexShrink: 0 }} />
          
          {/* Center: Title and status */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl text-gray-600">
                {callStatus === 'calling' ? t.calling(unit) : t.connected(unit)}
              </h2>
              {/* Countdown Timer Display */}
              <span className="text-2xl text-gray-500">
                {callStatus === 'calling' 
                  ? `(${preConnectTimeLeft}${language === 'zh' ? ' 秒' : 's'})`
                  : ''}
              </span>
            </div>
            <h1 className="text-5xl text-gray-900 mb-3">{unit}</h1>
            {callStatus === 'connected' && (
              <div className="text-2xl text-gray-500">
                {t.timeRemaining}{language === 'zh' ? '：' : ': '}{connectedTimeLeft}{language === 'zh' ? ' 秒' : 's'}
              </div>
            )}
          </div>
          
          {/* Right: Spacer for symmetry */}
          <div style={{ width: '80px', flexShrink: 0 }} />
        </div>

        {/* Snapshot/Visual Area - Content changes, container persists */}
        <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
          {callStatus === 'calling' ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                <PhoneOff className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-2xl text-gray-400">{t.calling(unit)}</p>
            </div>
          ) : (
            <>
              {/* Static Snapshot Frame */}
              <div 
                key={snapshotVersion}
                className="w-[800px] h-[450px] bg-gray-800 border-4 border-gray-700 rounded-lg overflow-hidden flex items-center justify-center"
              >
                {/* Simulated snapshot content - in production this would be actual image */}
                <div className="text-center">
                  <div className="w-40 h-40 rounded-full bg-gray-700 mx-auto mb-6 flex items-center justify-center">
                    <div className="text-7xl">👤</div>
                  </div>
                  <div className="text-gray-500 text-xl">Snapshot #{snapshotVersion}</div>
                </div>
              </div>
              
              {/* Subtle snapshot info overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/50 rounded-full">
                <p className="text-sm text-gray-300">{t.snapshotInfo}</p>
              </div>
            </>
          )}
        </div>

        {/* Status Bar - Updates based on door state */}
        <div className="px-16 py-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4">
            {doorUnlocked ? (
              <>
                <LockOpen className="w-8 h-8 text-green-600" />
                <span className="text-2xl text-green-600">{t.doorUnlocked}</span>
              </>
            ) : (
              <>
                <Lock className="w-8 h-8 text-gray-500" />
                <span className="text-2xl text-gray-600">{t.doorLocked}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Control Bar — Session (Persistent): 96px fixed height */}
      <BottomControlBar>
        <button
          onClick={handleManualEnd}
          className="rounded-lg bg-gray-600 text-white active:bg-gray-700 transition-colors flex items-center gap-4"
          style={{ height: '64px', paddingLeft: '128px', paddingRight: '128px' }}
        >
          <PhoneOff className="w-8 h-8" strokeWidth={2} />
          <span className="text-2xl">{t.endCall}</span>
        </button>
      </BottomControlBar>
    </div>
  );
}