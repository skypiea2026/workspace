import { useState, useEffect } from 'react';
import { Server, Wifi, CircleCheck, CircleX, Loader2, ChevronLeft, Tag } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface DeviceConnectionSettingsProps {
  onNext: () => void;
  onBack: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Device Connection Settings',
    deviceName: 'Device Name',
    deviceNamePlaceholder: 'e.g., Main Entrance, Entrance Intercom 1',
    deviceNameHelper: 'Optional. Used for backend identification, logs, and maintenance. Not visible to visitors.',
    backendIp: 'Backend IP Address',
    backendIpPlaceholder: '192.168.1.100',
    backendPort: 'Backend Port',
    backendPortPlaceholder: '8080',
    connectionStatus: 'Connection Status',
    connectionStatusHelper: 'Read-only. Connection status is managed by backend.',
    testConnection: 'Test Connection',
    testing: 'Testing...',
    statusConnected: 'Connected',
    statusTesting: 'Testing...',
    statusFailed: 'Failed',
    statusTimeout: 'Timeout / No Response',
    statusNotTested: 'Not Tested',
    infoMessage: 'These settings ensure correct backend connectivity. Community selection and feature toggles are not available on the door station device.',
    back: 'Back',
    next: 'Next',
  },
  zh: {
    title: '裝置連線設定',
    deviceName: '裝置名稱',
    deviceNamePlaceholder: '例如：主入口、入口對講機 1',
    deviceNameHelper: '選填。用於後端識別、紀錄及維護。訪客不會看到此資訊。',
    backendIp: '後端 IP 位址',
    backendIpPlaceholder: '192.168.1.100',
    backendPort: '後端連接埠',
    backendPortPlaceholder: '8080',
    connectionStatus: '連線狀態',
    connectionStatusHelper: '唯讀。連線狀態由後端管理。',
    testConnection: '測試連線',
    testing: '測試中…',
    statusConnected: '已連線',
    statusTesting: '測試中…',
    statusFailed: '失敗',
    statusTimeout: '逾時／無回應',
    statusNotTested: '尚未測試',
    infoMessage: '這些設定可確保正確的後端連線。社區選擇與功能切換不在門禁裝置上提供。',
    back: '返回',
    next: '下一步',
  },
  es: {
    title: 'Configuración de conexión del dispositivo',
    deviceName: 'Nombre del dispositivo',
    deviceNamePlaceholder: 'p. ej., Entrada principal, Intercomunicador 1',
    deviceNameHelper: 'Opcional. Se utiliza para identificación, registros y mantenimiento del backend. No visible para los visitantes.',
    backendIp: 'Dirección IP del backend',
    backendIpPlaceholder: '192.168.1.100',
    backendPort: 'Puerto del backend',
    backendPortPlaceholder: '8080',
    connectionStatus: 'Estado de conexión',
    connectionStatusHelper: 'Solo lectura. El estado de conexión es administrado por el backend.',
    testConnection: 'Probar conexión',
    testing: 'Probando...',
    statusConnected: 'Conectado',
    statusTesting: 'Probando...',
    statusFailed: 'Falló',
    statusTimeout: 'Tiempo de espera agotado / Sin respuesta',
    statusNotTested: 'No probado',
    infoMessage: 'Estas configuraciones garantizan la conectividad correcta del backend. La selección de comunidad y las funciones no están disponibles en el dispositivo de puerta.',
    back: 'Atrás',
    next: 'Siguiente',
  },
};

export default function DeviceConnectionSettings({ onNext, onBack, language }: DeviceConnectionSettingsProps) {
  const t = translations[language];
  const [deviceName, setDeviceName] = useState('');
  const [ipAddress, setIpAddress] = useState('192.168.1.100');
  const [port, setPort] = useState('8080');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'connected' | 'failed' | 'timeout'>('idle');
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setConnectionStatus('testing');

    // Simulate backend connectivity test
    // In production, this would be a real API call to test the connection
    setTimeout(() => {
      // Simulate random test result for demonstration
      // In production, this would reflect actual connectivity
      const testResult = Math.random();
      if (testResult > 0.7) {
        setConnectionStatus('connected');
      } else if (testResult > 0.4) {
        setConnectionStatus('failed');
      } else {
        setConnectionStatus('timeout');
      }
      setIsTesting(false);
    }, 2000); // 2 second simulated test duration
  };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Header with Home/Back Icon and Title */}
      <div 
        className="flex items-center border-b border-gray-200 flex-shrink-0"
        style={{ paddingLeft: '112px', paddingRight: '64px', paddingTop: '32px', paddingBottom: '32px' }}
      >
        {/* Home/Back Icon Button - 48×48 hit area, 36×36 icon */}
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0"
          style={{ width: '48px', height: '48px' }}
        >
          <ChevronLeft className="text-gray-600" style={{ width: '36px', height: '36px' }} />
        </button>
        
        {/* Title - Aligned horizontally with icon */}
        <h1 className="text-4xl text-gray-900" style={{ marginLeft: '16px' }}>
          {t.title}
        </h1>
      </div>

      {/* Settings Form - Scrollable */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{ paddingLeft: '64px', paddingRight: '64px', paddingTop: '48px', paddingBottom: '120px' }}
      >
        <div className="max-w-4xl space-y-8">
          {/* Device Name */}
          <div className="space-y-3">
            <label className="text-2xl text-gray-700 flex items-center gap-3">
              <Tag className="w-7 h-7 text-gray-500" />
              {t.deviceName}
            </label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              maxLength={30}
              className="w-full h-20 px-8 text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
              placeholder={t.deviceNamePlaceholder}
            />
            <p className="text-lg text-gray-500 pl-2">
              {t.deviceNameHelper}
            </p>
          </div>

          {/* Backend IP Address */}
          <div className="space-y-3">
            <label className="text-2xl text-gray-700 flex items-center gap-3">
              <Server className="w-7 h-7 text-gray-500" />
              {t.backendIp}
            </label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="w-full h-20 px-8 text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors font-mono"
              placeholder={t.backendIpPlaceholder}
            />
          </div>

          {/* Backend Port */}
          <div className="space-y-3">
            <label className="text-2xl text-gray-700 flex items-center gap-3">
              <Wifi className="w-7 h-7 text-gray-500" />
              {t.backendPort}
            </label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full h-20 px-8 text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors font-mono"
              placeholder={t.backendPortPlaceholder}
            />
          </div>

          {/* Connection Status */}
          <div className="space-y-3">
            <label className="text-2xl text-gray-700">{t.connectionStatus}</label>
            <div
              className={`w-full h-20 px-8 flex items-center gap-4 rounded-lg border-2 ${
                connectionStatus === 'connected'
                  ? 'border-green-200 bg-green-50'
                  : connectionStatus === 'testing'
                  ? 'border-blue-200 bg-blue-50'
                  : connectionStatus === 'failed' || connectionStatus === 'timeout'
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {connectionStatus === 'connected' ? (
                <>
                  <CircleCheck className="w-8 h-8 text-green-600" />
                  <span className="text-2xl text-green-700">{t.statusConnected}</span>
                </>
              ) : connectionStatus === 'testing' ? (
                <>
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <span className="text-2xl text-blue-700">{t.statusTesting}</span>
                </>
              ) : connectionStatus === 'failed' ? (
                <>
                  <CircleX className="w-8 h-8 text-red-600" />
                  <span className="text-2xl text-red-700">{t.statusFailed}</span>
                </>
              ) : connectionStatus === 'timeout' ? (
                <>
                  <CircleX className="w-8 h-8 text-red-600" />
                  <span className="text-2xl text-red-700">{t.statusTimeout}</span>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full border-2 border-gray-400" />
                  <span className="text-2xl text-gray-600">{t.statusNotTested}</span>
                </>
              )}
            </div>
            <p className="text-lg text-gray-500 pl-2">
              {t.connectionStatusHelper}
            </p>
            
            {/* Test Connection Button */}
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="h-16 px-10 rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="text-xl">
                {isTesting ? t.testing : t.testConnection}
              </span>
            </button>
          </div>

          {/* Info Box - Last element with bottom margin */}
          <div className="px-8 py-6 bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <p className="text-xl text-blue-900">
              {t.infoMessage}
            </p>
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
            onClick={onNext}
            className="rounded-lg bg-blue-600 text-white flex items-center justify-center active:bg-blue-700 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <span style={{ fontSize: '28px' }}>{t.next}</span>
          </button>
        }
      />
    </div>
  );
}
