import { useState, useEffect } from 'react';
import { TimerSettings } from './types';
import { SettingsPanel } from './components/SettingsPanel';
import { TimerScreen } from './components/TimerScreen';

type AppScreen = 'settings' | 'timer';

const defaultSettings: TimerSettings = {
  focusMinutes: 25,
  breakMinutes: 5,
  fontStyle: 'modern',
  theme: 'classic-black',
  customBackground: null,
};

export function App() {
  const [screen, setScreen] = useState<AppScreen>('settings');

  // Toggle body overflow based on screen
  useEffect(() => {
    if (screen === 'timer') {
      document.body.classList.add('timer-active');
    } else {
      document.body.classList.remove('timer-active');
    }
    return () => {
      document.body.classList.remove('timer-active');
    };
  }, [screen]);

  const [settings, setSettings] = useState<TimerSettings>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('pomodoro-settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const handleSettingsChange = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    localStorage.setItem('pomodoro-settings', JSON.stringify(newSettings));
  };

  const handleStart = () => {
    setScreen('timer');
  };

  const handleBack = () => {
    setScreen('settings');
  };

  return (
    <div className="w-full min-h-screen">
      {screen === 'settings' && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onStart={handleStart}
        />
      )}
      {screen === 'timer' && (
        <TimerScreen settings={settings} onBack={handleBack} />
      )}
    </div>
  );
}
