import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerSettings, TimerMode } from '../types';
import { themes, fontStyles } from '../themes';

interface TimerScreenProps {
  settings: TimerSettings;
  onBack: () => void;
}

export function TimerScreen({ settings, onBack }: TimerScreenProps) {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessions] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  const totalTime = mode === 'focus' ? settings.focusMinutes * 60 : settings.breakMinutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const theme = themes[settings.theme];
  const font = fontStyles[settings.fontStyle];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, [soundEnabled]);

  const switchMode = useCallback(() => {
    if (mode === 'focus') {
      setSessions((s) => s + 1);
      setMode('break');
      setTimeLeft(settings.breakMinutes * 60);
    } else {
      setMode('focus');
      setTimeLeft(settings.focusMinutes * 60);
    }
    playSound();
  }, [mode, settings.focusMinutes, settings.breakMinutes, playSound]);

  useEffect(() => {
    let interval: number | null = null;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      switchMode();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, switchMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsRunning((r) => !r);
        setShowControls(true);
      } else if (e.code === 'KeyR') {
        setIsRunning(false);
        setTimeLeft(mode === 'focus' ? settings.focusMinutes * 60 : settings.breakMinutes * 60);
        setShowControls(true);
      } else if (e.code === 'KeyS') {
        switchMode();
        setShowControls(true);
      } else if (e.code === 'Escape') {
        onBack();
      } else if (e.code === 'KeyM') {
        setSoundEnabled((s) => !s);
        setShowControls(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, settings.focusMinutes, settings.breakMinutes, switchMode, onBack]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isRunning) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (isRunning) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    setShowControls(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? settings.focusMinutes * 60 : settings.breakMinutes * 60);
    setShowControls(true);
  };

  const skipToNext = () => {
    switchMode();
    setShowControls(true);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    setShowControls(true);
  };

  const getFontSize = () => {
    return 'clamp(100px, 30vw, 380px)';
  };

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center ${
        settings.customBackground ? '' : theme.bg
      }`}
      style={
        settings.customBackground
          ? {
              backgroundImage: `url(${settings.customBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onTouchStart={() => setShowControls(true)}
      onClick={toggleTimer}
    >
      {/* Background overlay for custom backgrounds */}
      {settings.customBackground && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-black/20">
        <div
          className={`h-full transition-all duration-1000 ${
            mode === 'focus'
              ? 'bg-gradient-to-r from-pink-500 to-purple-500'
              : 'bg-gradient-to-r from-green-500 to-teal-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mode indicator & Sound toggle */}
      <div
        className={`absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`px-6 py-2 rounded-full backdrop-blur-md ${settings.customBackground ? 'bg-white/20 text-white' : `${theme.buttonBg} ${theme.text}`}`}>
          <span className="flex items-center gap-2 font-medium">
            {mode === 'focus' ? (
              <>
                <span className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
                FOCUS MODE
              </>
            ) : (
              <>
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                BREAK TIME
              </>
            )}
          </span>
        </div>
        
        <button
          onClick={toggleSound}
          className={`p-2 rounded-full backdrop-blur-md transition-all hover:scale-110 cursor-pointer ${
            settings.customBackground
              ? 'bg-white/20 text-white hover:bg-white/30'
              : `${theme.buttonBg} ${theme.buttonText}`
          }`}
        >
          {soundEnabled ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      </div>

      {/* Main Timer Display - FULL SCREEN */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          className={`font-bold select-none leading-none ${
            settings.customBackground ? 'text-white drop-shadow-2xl' : theme.text
          }`}
          style={{
            ...font.style,
            fontSize: getFontSize(),
            textShadow: settings.customBackground
              ? '0 0 60px rgba(0,0,0,0.5), 0 0 120px rgba(0,0,0,0.3)'
              : 'none',
          }}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Session counter */}
        <div
          className={`mt-4 text-xl tracking-widest ${
            settings.customBackground ? 'text-white/60' : theme.accent
          }`}
        >
          SESSION {sessionsCompleted + 1}
        </div>
      </div>

      {/* Control buttons */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          className={`p-4 rounded-full backdrop-blur-md transition-all hover:scale-110 cursor-pointer ${
            settings.customBackground
              ? 'bg-white/20 text-white hover:bg-white/30'
              : `${theme.buttonBg} ${theme.buttonText}`
          }`}
          title="Back to settings (Esc)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Reset button */}
        <button
          onClick={resetTimer}
          className={`p-4 rounded-full backdrop-blur-md transition-all hover:scale-110 cursor-pointer ${
            settings.customBackground
              ? 'bg-white/20 text-white hover:bg-white/30'
              : `${theme.buttonBg} ${theme.buttonText}`
          }`}
          title="Reset timer (R)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        {/* Play/Pause button */}
        <button
          onClick={toggleTimer}
          className={`p-6 rounded-full backdrop-blur-md transition-all hover:scale-110 cursor-pointer ${
            settings.customBackground
              ? 'bg-white/30 text-white hover:bg-white/40'
              : `${theme.buttonBg} ${theme.buttonText}`
          }`}
          title="Play/Pause (Space)"
        >
          {isRunning ? (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        {/* Skip button */}
        <button
          onClick={skipToNext}
          className={`p-4 rounded-full backdrop-blur-md transition-all hover:scale-110 cursor-pointer ${
            settings.customBackground
              ? 'bg-white/20 text-white hover:bg-white/30'
              : `${theme.buttonBg} ${theme.buttonText}`
          }`}
          title="Skip to next (S)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard shortcuts hint */}
      <div
        className={`absolute bottom-28 left-1/2 -translate-x-1/2 text-sm transition-all duration-300 text-center ${
          showControls ? 'opacity-60' : 'opacity-0'
        } ${settings.customBackground ? 'text-white' : theme.accent}`}
      >
        <div>Click anywhere or press Space to {isRunning ? 'pause' : 'start'}</div>
        <div className="text-xs mt-1 opacity-70">R: Reset • S: Skip • M: Mute • Esc: Settings</div>
      </div>
    </div>
  );
}
