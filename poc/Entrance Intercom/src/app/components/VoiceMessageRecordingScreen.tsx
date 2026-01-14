// VoiceMessageRecordingScreen.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, CircleCheck } from 'lucide-react';
import { Language } from '../App';
import BottomControlBar from './BottomControlBar';
import SelectedUnitHeader from './SelectedUnitHeader';

interface VoiceMessageRecordingScreenProps {
  unit: string;
  onComplete: () => void;
  onCancel?: () => void;
  language: Language;
}

const MAX_DURATION_SEC = 30;
const BEEP_DURATION_MS = 500; // 0.5s pre-roll
const SUBMIT_DELAY_MS = 2000; // UI feedback before leaving

const translations: Record<
  string,
  {
    title: string;
    instructionBeep: (unit: string) => string;
    instruction: (unit: string) => string;
    recording: (unit: string) => string;
    endRecording: string;
    cancel: string;
    submitting: (unit: string) => string;
    sec: string;
  }
> = {
  en: {
    title: 'Voice Message',
    instructionBeep: (unit: string) => `Preparing to record for Unit ${unit}...`,
    instruction: (unit: string) => `Recording message for Unit ${unit}. Maximum duration is 30 seconds.`,
    recording: (unit: string) => `Recording for Unit ${unit}...`,
    endRecording: 'End Recording',
    cancel: 'Cancel',
    submitting: (unit: string) => `Sending message to Unit ${unit}...`,
    sec: 'sec',
  },
  // 正體中文
  zh: {
    title: '語音留言',
    instructionBeep: (unit: string) => `準備錄製給 ${unit}...`,
    instruction: (unit: string) => `正在錄製留言給 ${unit}。最長錄製時間為 30 秒。`,
    recording: (unit: string) => `正在錄製給 ${unit}...`,
    endRecording: '結束錄製',
    cancel: '取消',
    submitting: (unit: string) => `正在上傳給 ${unit}...`,
    sec: '秒',
  },
  es: {
    title: 'Mensaje de Voz',
    instructionBeep: (unit: string) => `Preparando grabación para Unidad ${unit}...`,
    instruction: (unit: string) => `Grabando mensaje para Unidad ${unit}. Duración máxima de 30 segundos.`,
    recording: (unit: string) => `Grabando para Unidad ${unit}...`,
    endRecording: 'Finalizar Grabación',
    cancel: 'Cancelar',
    submitting: (unit: string) => `Enviando mensaje a Unidad ${unit}...`,
    sec: 's',
  },
};

function safeT(language: Language) {
  return translations[language] ?? translations.en;
}

/**
 * VOICE MESSAGE SESSION — BEEP PRE-ROLL + AUTO-START RECORDING
 * - On mount: beep (0.5s). Cancel is enabled; End Recording is disabled.
 * - After beep: start recording + start countdown (30s). End Recording enabled.
 * - End Recording: stop + submit + complete after 2s.
 * - Cancel anytime: abort beep/recording/submitting, discard, return to idle (via onCancel).
 *
 * NOTE: This component currently simulates timing only. Hook your actual audio recording start/stop
 * into the points marked below.
 */
export default function VoiceMessageRecordingScreen({
  unit,
  onComplete,
  onCancel,
  language,
}: VoiceMessageRecordingScreenProps) {
  const t = safeT(language);

  const [recordingState, setRecordingState] = useState<'beeping' | 'recording' | 'submitting'>('beeping');
  const [timeLeft, setTimeLeft] = useState<number>(MAX_DURATION_SEC);

  // Timers & lifecycle guards (prevents "Cancel then still auto-start/auto-complete")
  const beepTimeoutRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const completeTimeoutRef = useRef<number | null>(null);

  const activeRef = useRef(true); // becomes false on cancel/unmount
  const endedRef = useRef(false); // ensures end/submit runs only once

  const clearAllTimers = () => {
    if (beepTimeoutRef.current !== null) {
      window.clearTimeout(beepTimeoutRef.current);
      beepTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current !== null) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (completeTimeoutRef.current !== null) {
      window.clearTimeout(completeTimeoutRef.current);
      completeTimeoutRef.current = null;
    }
  };

  const startRecordingNow = () => {
    if (!activeRef.current) return;

    // TODO: Start actual audio recording here
    // startRecorder();

    endedRef.current = false;
    setTimeLeft(MAX_DURATION_SEC);
    setRecordingState('recording');
  };

  const stopRecordingNow = () => {
    // TODO: Stop actual audio recording here
    // stopRecorder();
  };

  const handleEndRecording = () => {
    if (!activeRef.current) return;
    if (endedRef.current) return;

    endedRef.current = true;

    // Stop timers immediately so nothing else fires
    clearAllTimers();

    // Stop recording and submit
    stopRecordingNow();
    setRecordingState('submitting');

    completeTimeoutRef.current = window.setTimeout(() => {
      if (!activeRef.current) return;
      onComplete();
    }, SUBMIT_DELAY_MS);
  };

  const handleCancel = () => {
    // Abort everything, discard, return to idle
    activeRef.current = false;

    clearAllTimers();

    // Stop recording if it had started
    stopRecordingNow();

    onCancel?.();
  };

  // Mount: beep pre-roll then auto-start recording
  useEffect(() => {
    activeRef.current = true;
    endedRef.current = false;

    // Optional: play beep here (keep simple; real audio implementation can be added)
    // playBeep();

    beepTimeoutRef.current = window.setTimeout(() => {
      if (!activeRef.current) return;
      startRecordingNow();
    }, BEEP_DURATION_MS);

    return () => {
      activeRef.current = false;
      clearAllTimers();
      stopRecordingNow();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start countdown interval ONLY when recording starts
  useEffect(() => {
    if (recordingState !== 'recording') return;

    countdownIntervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      if (countdownIntervalRef.current !== null) {
        window.clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [recordingState]);

  // When countdown hits 0, end recording (avoid side-effects inside setState updater)
  useEffect(() => {
    if (recordingState === 'recording' && timeLeft === 0) {
      handleEndRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordingState, timeLeft]);

  // Waveform: keep stable in beeping/submitting, animate only during recording
  const waveformBars = useMemo(() => {
    // deterministic-ish bars; update per second during recording via timeLeft dependency
    // (not perfect, but avoids Math.random on every render causing jittery layout)
    const base = recordingState === 'recording' ? 40 : 24;
    const variance = recordingState === 'recording' ? 50 : 0;
    return Array.from({ length: 20 }, (_, i) => {
      const seed = (i * 17 + (MAX_DURATION_SEC - timeLeft) * 13) % 97;
      const normalized = seed / 96;
      return base + normalized * variance;
    });
  }, [recordingState, timeLeft]);

  const isBeeping = recordingState === 'beeping';
  const isSubmitting = recordingState === 'submitting';
  const isRecording = recordingState === 'recording';

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {isSubmitting ? (
        // Submitting State - Full Screen Feedback
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <div className="w-48 h-48 rounded-full bg-green-50 flex items-center justify-center">
              <CircleCheck className="w-24 h-24 text-green-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl text-gray-900">{t.submitting(unit)}</h2>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER SECTION - 3-column layout to prevent GlobalLogo overlap */}
          <div
            className="flex items-center border-b border-gray-200"
            style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '32px', paddingBottom: '24px' }}
          >
            {/* Left: Spacer for GlobalLogo (64px) + gap (16px) */}
            <div style={{ width: '80px', flexShrink: 0 }} />

            {/* Center: Title and instruction */}
            <div className="flex-1 flex flex-col items-center">
              <h1 className="text-5xl text-gray-900 mb-3">{t.title}</h1>
              <p className="text-2xl text-gray-600">
                {isBeeping ? t.instructionBeep(unit) : t.instruction(unit)}
              </p>
            </div>

            {/* Right: Spacer for symmetry */}
            <div style={{ width: '80px', flexShrink: 0 }} />
          </div>

          {/* CONTENT SECTION - Flexible, spacious */}
          <div className="flex-1 flex flex-col items-center justify-center px-16">
            {/* Timer */}
            <div className="flex items-center justify-center mb-12">
              <div className="text-9xl font-light text-gray-900">{timeLeft}</div>
              <div className="text-4xl text-gray-500 ml-4">{t.sec}</div>
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {waveformBars.map((height, i) => (
                <div
                  key={i}
                  className="w-6 bg-blue-600 rounded-full transition-all duration-200"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>

            {/* Microphone Icon */}
            <div className="flex items-center justify-center mb-8">
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center ${
                  isRecording ? 'bg-red-600 animate-pulse' : 'bg-gray-300'
                }`}
              >
                <Mic className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center">
              <p className="text-2xl text-gray-600">{isRecording ? t.recording(unit) : ''}</p>
            </div>
          </div>

          {/* Bottom Control Bar — Session (Persistent): keep your 96px fixed layout inside BottomControlBar */}
          <BottomControlBar>
            <div className="flex items-center gap-6">
              {/* Primary: End Recording (disabled during beep) */}
              <button
                onClick={isRecording ? handleEndRecording : undefined}
                disabled={isBeeping || isSubmitting}
                className="rounded-lg bg-blue-600 text-white active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ height: '64px', paddingLeft: '96px', paddingRight: '96px' }}
              >
                <span className="text-2xl">{t.endRecording}</span>
              </button>

              {/* Secondary: Cancel (always enabled except submitting) */}
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="rounded-lg border-2 border-gray-300 bg-white text-gray-700 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ height: '64px', paddingLeft: '96px', paddingRight: '96px' }}
              >
                <span className="text-2xl">{t.cancel}</span>
              </button>
            </div>
          </BottomControlBar>
        </>
      )}
    </div>
  );
}