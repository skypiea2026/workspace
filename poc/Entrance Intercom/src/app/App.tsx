import { useState, useRef, useEffect } from 'react';
import IdleScreen from './components/IdleScreen';
import MainMenu from './components/MainMenu';
import SelectUnitScreen from './components/SelectUnitScreen';
import PhotoCaptureScreen from './components/PhotoCaptureScreen';
import DeliveryWaitingScreen from './components/DeliveryWaitingScreen';
import IntercomWarningScreen from './components/IntercomWarningScreen';
import VoiceMessageWarningScreen from './components/VoiceMessageWarningScreen';
import IntercomInCallScreen from './components/IntercomInCallScreen';
import VoiceMessageRecordingScreen from './components/VoiceMessageRecordingScreen';
import NoResponseScreen from './components/NoResponseScreen';
import LanguageSwitchPanel from './components/LanguageSwitchPanel';
import EnterSetupModeScreen from './components/EnterSetupModeScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import DeviceConnectionSettings from './components/DeviceConnectionSettings';
import ServiceUnitAssignment from './components/ServiceUnitAssignment';
import UploadingSettingsScreen from './components/UploadingSettingsScreen';
import UploadSuccessScreen from './components/UploadSuccessScreen';
import UploadFailedScreen from './components/UploadFailedScreen';
import GlobalLogo from './components/GlobalLogo';
import ExitSetupConfirmDialog from './components/ExitSetupConfirmDialog';
import SafeAreaFrame from './components/SafeAreaFrame';
import ConnectionStatusBadge from './components/ConnectionStatusBadge';

export type Screen = 
  | 'idle'
  | 'main-menu'
  | 'select-unit'
  | 'photo-capture'
  | 'delivery-waiting'
  | 'intercom-warning'
  | 'voice-message-warning'
  | 'intercom-in-call'
  | 'voice-message-recording'
  | 'no-response'
  | 'enter-setup-mode'
  | 'admin-login'
  | 'device-connection-settings'
  | 'uploading-settings'
  | 'upload-success'
  | 'upload-failed'
  | 'service-unit-assignment';

export type Language = 'en' | 'zh' | 'es';

export type FlowType = 'delivery' | 'intercom' | 'voice-message';

export type ConnectionStatus = 'not-configured' | 'offline' | 'online';

// Idle → Home transition style options
export type IdleToHomeTransitionStyle = 'A' | 'B' | 'C';

// Default transition style: Option A (crossfade + subtle settle scale)
const DEFAULT_TRANSITION_STYLE: IdleToHomeTransitionStyle = 'A';

function App() {
  // Load language from localStorage or default to 'en'
  const [currentScreen, setCurrentScreen] = useState<Screen>('idle');
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    return (savedLanguage === 'en' || savedLanguage === 'zh' || savedLanguage === 'es') 
      ? savedLanguage 
      : 'en';
  });
  const [showLanguagePanel, setShowLanguagePanel] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [currentFlow, setCurrentFlow] = useState<FlowType | null>(null);
  const [showExitSetupDialog, setShowExitSetupDialog] = useState(false);
  
  // Community name and connection state
  const [communityName, setCommunityName] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('not-configured');
  
  // Transition animation state for screen navigation
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const [transitionStyle] = useState<IdleToHomeTransitionStyle>(DEFAULT_TRANSITION_STYLE);
  const [exitingScreen, setExitingScreen] = useState<Screen | null>(null);
  
  // Multi-tap detection for hidden setup mode entry
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Persist language changes to localStorage
  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const handleScreenChange = (screen: Screen) => {
    const isNavigatingToHome = screen === 'main-menu';
    const isNavigatingToIdle = screen === 'idle';
    const isNavigatingFromIdle = currentScreen === 'idle';
    const shouldAnimate = isNavigatingToHome || isNavigatingToIdle;
    
    // Handle premium transitions
    if (shouldAnimate && !isNavigatingFromIdle) {
      // Any Screen → Home/Idle transition
      setExitingScreen(currentScreen);
      setIsTransitioning(true);
      setTransitionPhase('exiting');
      
      // Start exit animation (current screen fade out: 140-160ms)
      // Then switch to target screen and start enter animation
      // For Idle, use sequenced mode to prevent flash
      const switchDelay = isNavigatingToIdle ? 140 : 100; // Longer delay for Idle to ensure complete exit
      
      setTimeout(() => {
        setCurrentScreen(screen);
        setTransitionPhase('entering');
        
        // Complete transition after enter animation (240ms for Home, 210ms for Idle)
        const enterDuration = isNavigatingToIdle ? 210 : 240;
        setTimeout(() => {
          setIsTransitioning(false);
          setTransitionPhase('idle');
          setExitingScreen(null);
        }, enterDuration);
      }, switchDelay);
    } else if (isNavigatingFromIdle && isNavigatingToHome) {
      // Idle → Main Menu transition (original implementation)
      setIsTransitioning(true);
      setTransitionPhase('exiting');
      
      // Start exit animation (Idle fade out + blur: 160ms)
      // Then switch to Main Menu and start enter animation
      setTimeout(() => {
        setCurrentScreen(screen);
        setTransitionPhase('entering');
        
        // Complete transition after enter animation (240ms)
        setTimeout(() => {
          setIsTransitioning(false);
          setTransitionPhase('idle');
        }, 240);
      }, 100); // Slight overlap: start Home ~100ms into Idle exit for smooth continuity
    } else {
      // All other screen changes: instant (no transition)
      setCurrentScreen(screen);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setShowLanguagePanel(false);
  };

  const handleUnitSelect = (unit: string) => {
    setSelectedUnit(unit);
  };

  const handleFlowSelect = (flow: FlowType) => {
    setCurrentFlow(flow);
  };

  // Determine if we're in admin mode
  const isAdminMode = currentScreen === 'enter-setup-mode' 
    || currentScreen === 'admin-login' 
    || currentScreen === 'device-connection-settings' 
    || currentScreen === 'uploading-settings'
    || currentScreen === 'upload-success'
    || currentScreen === 'upload-failed'
    || currentScreen === 'service-unit-assignment';

  // Determine if logo should be shown (hide on uploading screen to prevent leaving mid-upload)
  const shouldShowLogo = currentScreen !== 'idle' && currentScreen !== 'uploading-settings';

  const handleLogoClick = () => {
    if (isAdminMode) {
      // In admin mode, show confirmation dialog
      setShowExitSetupDialog(true);
    } else {
      // In visitor mode, handle multi-tap detection
      tapCountRef.current += 1;

      // Clear existing timer
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }

      // Check if we've reached 8 taps
      if (tapCountRef.current >= 8) {
        // Enter setup mode
        tapCountRef.current = 0;
        setSelectedUnit(null);
        setCurrentFlow(null);
        handleScreenChange('enter-setup-mode');
      } else {
        // Set timer to check tap count after brief delay
        tapTimerRef.current = setTimeout(() => {
          const finalTapCount = tapCountRef.current;
          tapCountRef.current = 0; // Reset counter
          
          // If it was a single tap, return to idle
          if (finalTapCount === 1) {
            setSelectedUnit(null);
            setCurrentFlow(null);
            handleScreenChange('idle');
          }
          // If 2-7 taps, just reset (do nothing - failed setup entry attempt)
        }, 400); // 400ms window to distinguish single tap from multi-tap
      }
    }
  };

  const handleExitSetupConfirm = () => {
    setShowExitSetupDialog(false);
    setSelectedUnit(null);
    setCurrentFlow(null);
    handleScreenChange('idle');
  };

  const handleExitSetupCancel = () => {
    setShowExitSetupDialog(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'idle':
        return (
          <IdleScreen
            onTouch={() => handleScreenChange('main-menu')}
            onEnterSetup={() => handleScreenChange('enter-setup-mode')}
            language={language}
            communityName={communityName}
            connectionStatus={connectionStatus}
            isEntering={transitionPhase === 'entering' && currentScreen === 'idle'}
            transitionStyle={transitionStyle}
          />
        );
      case 'main-menu':
        return (
          <MainMenu
            onFlowSelect={(flow) => {
              handleFlowSelect(flow);
              handleScreenChange('select-unit');
            }}
            onLanguageToggle={() => setShowLanguagePanel(true)}
            onBack={() => handleScreenChange('idle')}
            language={language}
            transitionStyle={transitionStyle}
          />
        );
      case 'select-unit':
        return (
          <SelectUnitScreen
            onUnitSelect={handleUnitSelect}
            selectedUnit={selectedUnit}
            onConfirm={() => {
              // Route based on flow type
              if (currentFlow === 'delivery') {
                handleScreenChange('photo-capture');
              } else if (currentFlow === 'intercom') {
                handleScreenChange('intercom-warning');
              } else if (currentFlow === 'voice-message') {
                handleScreenChange('voice-message-warning');
              }
            }}
            onBack={() => handleScreenChange('main-menu')}
            language={language}
            isExiting={exitingScreen === 'select-unit'}
          />
        );
      case 'photo-capture':
        return (
          <PhotoCaptureScreen
            unit={selectedUnit || ''}
            onComplete={() => {
              if (currentFlow === 'delivery') {
                handleScreenChange('delivery-waiting');
              } else if (currentFlow === 'intercom') {
                handleScreenChange('intercom-warning');
              } else if (currentFlow === 'voice-message') {
                handleScreenChange('voice-message-recording');
              }
            }}
            language={language}
          />
        );
      case 'delivery-waiting':
        return (
          <DeliveryWaitingScreen
            unit={selectedUnit || ''}
            onComplete={() => handleScreenChange('no-response')}
            language={language}
            isExiting={exitingScreen === 'delivery-waiting'}
          />
        );
      case 'intercom-warning':
        return (
          <IntercomWarningScreen
            unit={selectedUnit || ''}
            onContinue={() => handleScreenChange('intercom-in-call')}
            onBack={() => handleScreenChange('select-unit')}
            language={language}
            isExiting={exitingScreen === 'intercom-warning'}
          />
        );
      case 'voice-message-warning':
        return (
          <VoiceMessageWarningScreen
            unit={selectedUnit || ''}
            onContinue={() => handleScreenChange('voice-message-recording')}
            onBack={() => handleScreenChange('select-unit')}
            language={language}
            isExiting={exitingScreen === 'voice-message-warning'}
          />
        );
      case 'intercom-in-call':
        return (
          <IntercomInCallScreen
            unit={selectedUnit || ''}
            onEnd={() => handleScreenChange('no-response')}
            language={language}
            isExiting={exitingScreen === 'intercom-in-call'}
          />
        );
      case 'voice-message-recording':
        return (
          <VoiceMessageRecordingScreen
            unit={selectedUnit || ''}
            onComplete={() => handleScreenChange('no-response')}
            onCancel={() => {
              setSelectedUnit(null);
              setCurrentFlow(null);
              handleScreenChange('idle');
            }}
            language={language}
            isExiting={exitingScreen === 'voice-message-recording'}
          />
        );
      case 'no-response':
        return (
          <NoResponseScreen
            onReturnToIdle={() => {
              setSelectedUnit(null);
              setCurrentFlow(null);
              handleScreenChange('idle');
            }}
            language={language}
            isExiting={exitingScreen === 'no-response'}
          />
        );
      case 'enter-setup-mode':
        return (
          <EnterSetupModeScreen
            onContinue={() => handleScreenChange('admin-login')}
            onCancel={() => handleScreenChange('idle')}
            language={language}
          />
        );
      case 'admin-login':
        return (
          <AdminLoginScreen
            onLogin={() => handleScreenChange('device-connection-settings')}
            onCancel={() => handleScreenChange('idle')}
            language={language}
          />
        );
      case 'device-connection-settings':
        return (
          <DeviceConnectionSettings
            onNext={() => handleScreenChange('service-unit-assignment')}
            onBack={() => handleScreenChange('admin-login')}
            language={language}
          />
        );
      case 'service-unit-assignment':
        return (
          <ServiceUnitAssignment
            onSave={() => handleScreenChange('uploading-settings')}
            onCancel={() => handleScreenChange('device-connection-settings')}
            language={language}
          />
        );
      case 'uploading-settings':
        return (
          <UploadingSettingsScreen
            language={language}
            onUploadComplete={(communityName) => {
              // Simulate receiving community name from backend
              setCommunityName(communityName);
              setConnectionStatus('online');
              // Cache the community name (in production, use localStorage)
              localStorage.setItem('cachedCommunityName', communityName);
              handleScreenChange('upload-success');
            }}
            onUploadFailed={() => handleScreenChange('upload-failed')}
          />
        );
      case 'upload-success':
        return (
          <UploadSuccessScreen
            onDone={() => handleScreenChange('idle')}
            language={language}
          />
        );
      case 'upload-failed':
        return (
          <UploadFailedScreen
            onBack={() => handleScreenChange('device-connection-settings')}
            onRetry={() => handleScreenChange('uploading-settings')}
            language={language}
          />
        );
      default:
        return (
          <IdleScreen
            onTouch={() => handleScreenChange('main-menu')}
            onEnterSetup={() => handleScreenChange('enter-setup-mode')}
            language={language}
            communityName={communityName}
            connectionStatus={connectionStatus}
            isEntering={transitionPhase === 'entering' && currentScreen === 'idle'}
            transitionStyle={transitionStyle}
          />
        );
    }
  };

  return (
    <SafeAreaFrame>
      <div className="relative w-full h-full bg-white overflow-hidden">
        {renderScreen()}
        {shouldShowLogo && (
          <GlobalLogo 
            onClick={handleLogoClick}
            isAdminMode={isAdminMode}
          />
        )}
        {showLanguagePanel && (
          <LanguageSwitchPanel
            currentLanguage={language}
            onLanguageSelect={handleLanguageChange}
            onClose={() => setShowLanguagePanel(false)}
          />
        )}
        {showExitSetupDialog && (
          <ExitSetupConfirmDialog
            onConfirm={handleExitSetupConfirm}
            onCancel={handleExitSetupCancel}
            language={language}
          />
        )}
        {/* Connection Status Badge - Always visible, non-interactive */}
        <ConnectionStatusBadge
          connectionStatus={connectionStatus}
          language={language}
        />
      </div>
    </SafeAreaFrame>
  );
}

export default App;