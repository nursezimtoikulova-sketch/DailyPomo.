import { TimerSettings, ThemePreset, FontStyle } from '../types';
import { themes, fontStyles, predefined3DBackgrounds } from '../themes';
import { useState } from 'react';

interface SettingsPanelProps {
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
  onStart: () => void;
}

const focusOptions = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const breakOptions = [5, 10, 15, 20, 25, 30];

export function SettingsPanel({ settings, onSettingsChange, onStart }: SettingsPanelProps) {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | '3d' | 'ai'>('colors');

  const generateAIBackground = async (prompt: string) => {
    setIsGenerating(true);
    try {
      // Using Pollinations.ai - free AI image generation
      const encodedPrompt = encodeURIComponent(prompt + ' wallpaper background atmospheric');
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1920&height=1080&nologo=true`;
      
      onSettingsChange({
        ...settings,
        theme: 'custom-ai',
        customBackground: imageUrl,
      });
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Focus Flow
          </h1>
          <p className="text-gray-400 text-lg">Customize your perfect focus session</p>
        </div>

        {/* Timer Settings */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Timer Settings
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Focus Time */}
            <div>
              <label className="block text-sm text-gray-400 mb-3">Focus Duration</label>
              <div className="grid grid-cols-5 gap-2">
                {focusOptions.map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => onSettingsChange({ ...settings, focusMinutes: minutes })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      settings.focusMinutes === minutes
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    {minutes}m
                  </button>
                ))}
              </div>
            </div>

            {/* Break Time */}
            <div>
              <label className="block text-sm text-gray-400 mb-3">Break Duration</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {breakOptions.map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => onSettingsChange({ ...settings, breakMinutes: minutes })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      settings.breakMinutes === minutes
                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    {minutes}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Font Style */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            Number Style
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {(Object.entries(fontStyles) as [FontStyle, typeof fontStyles.modern][]).map(([key, font]) => (
              <button
                key={key}
                onClick={() => onSettingsChange({ ...settings, fontStyle: key })}
                className={`p-4 rounded-xl transition-all ${
                  settings.fontStyle === key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 scale-105'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <div className="text-3xl mb-1" style={font.style}>12</div>
                <div className="text-xs text-gray-400">{font.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Background Themes */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Background Theme
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('colors')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'colors' ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              🎨 Colors
            </button>
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === '3d' ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              🏰 3D Scenes
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'ai' ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              ✨ AI Generate
            </button>
          </div>

          {/* Color Themes */}
          {activeTab === 'colors' && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {(Object.entries(themes) as [ThemePreset, typeof themes['classic-black']][])
                .filter(([key]) => key !== 'custom-ai')
                .map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => onSettingsChange({ ...settings, theme: key, customBackground: null })}
                    className={`relative overflow-hidden rounded-xl transition-all ${
                      settings.theme === key && !settings.customBackground
                        ? 'ring-4 ring-white scale-105'
                        : 'hover:scale-102'
                    }`}
                  >
                    <div className={`${theme.bg} p-6 h-20 flex items-center justify-center`}>
                      <span className={`${theme.text} font-bold text-lg`}>25:00</span>
                    </div>
                    <div className="bg-black/50 py-2 text-xs text-center">{theme.name}</div>
                  </button>
                ))}
            </div>
          )}

          {/* 3D Backgrounds */}
          {activeTab === '3d' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {predefined3DBackgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => generateAIBackground(bg.prompt)}
                  className={`relative overflow-hidden rounded-xl transition-all hover:scale-105 ${
                    isGenerating ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 h-24 flex items-center justify-center">
                    <span className="text-3xl">
                      {bg.id.includes('castle') ? '🏰' :
                       bg.id.includes('forest') ? '🌲' :
                       bg.id.includes('space') ? '🚀' :
                       bg.id.includes('underwater') ? '🐠' :
                       bg.id.includes('mountains') ? '🏔️' :
                       bg.id.includes('city') ? '🌃' :
                       bg.id.includes('dragon') ? '🐉' : '🌸'}
                    </span>
                  </div>
                  <div className="bg-black/50 py-2 text-xs text-center">{bg.name}</div>
                </button>
              ))}
            </div>
          )}

          {/* AI Generate */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Describe the background you want and AI will generate it for you! (Free, powered by Pollinations.ai)
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., Northern lights over snowy mountains..."
                  className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => generateAIBackground(aiPrompt)}
                  disabled={!aiPrompt || isGenerating}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    '✨ Generate'
                  )}
                </button>
              </div>
              
              {/* Quick prompts */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Cozy coffee shop rainy window',
                  'Aurora borealis night sky',
                  'Japanese cherry blossom garden',
                  'Tropical beach sunset',
                  'Minimalist geometric abstract',
                  'Cozy library with fireplace',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setAiPrompt(prompt)}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview & Start */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div 
            className={`relative rounded-2xl overflow-hidden h-40 flex items-center justify-center ${
              settings.customBackground ? '' : themes[settings.theme].bg
            }`}
            style={settings.customBackground ? {
              backgroundImage: `url(${settings.customBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : {}}
          >
            {settings.customBackground && (
              <div className="absolute inset-0 bg-black/30" />
            )}
            <div 
              className={`relative z-10 text-6xl font-bold ${
                settings.customBackground ? 'text-white' : themes[settings.theme].text
              }`}
              style={fontStyles[settings.fontStyle].style}
            >
              {settings.focusMinutes}:00
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full py-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl text-2xl font-bold hover:scale-[1.02] transition-transform shadow-2xl shadow-green-500/30"
        >
          🚀 Start Focus Session
        </button>

        <p className="text-center text-gray-500 text-sm mt-4 mb-8">
          {settings.focusMinutes} min focus → {settings.breakMinutes} min break
        </p>
      </div>
    </div>
  );
}
