export type TimerMode = 'focus' | 'break';

export type FontStyle = 
  | 'modern' 
  | 'classic' 
  | 'nyt' 
  | 'digital' 
  | 'elegant' 
  | 'bold' 
  | 'handwritten';

export type ThemePreset = 
  | 'classic-black'
  | 'classic-white'
  | 'clean-pink'
  | 'cherry-red'
  | 'navy-blue'
  | 'forest-green'
  | 'ocean-teal'
  | 'sunset-orange'
  | 'lavender-dream'
  | 'midnight-purple'
  | 'custom-ai';

export interface TimerSettings {
  focusMinutes: number;
  breakMinutes: number;
  fontStyle: FontStyle;
  theme: ThemePreset;
  customBackground: string | null;
}

export interface Theme {
  name: string;
  bg: string;
  text: string;
  accent: string;
  buttonBg: string;
  buttonText: string;
}
