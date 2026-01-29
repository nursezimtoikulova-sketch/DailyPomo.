import { Theme, ThemePreset } from './types';

export const themes: Record<ThemePreset, Theme> = {
  'classic-black': {
    name: 'Classic Black',
    bg: 'bg-black',
    text: 'text-white',
    accent: 'text-gray-400',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonText: 'text-white',
  },
  'classic-white': {
    name: 'Classic White',
    bg: 'bg-white',
    text: 'text-gray-900',
    accent: 'text-gray-500',
    buttonBg: 'bg-gray-900/10 hover:bg-gray-900/20',
    buttonText: 'text-gray-900',
  },
  'clean-pink': {
    name: 'Clean Pink',
    bg: 'bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200',
    text: 'text-pink-900',
    accent: 'text-pink-600',
    buttonBg: 'bg-pink-500/20 hover:bg-pink-500/30',
    buttonText: 'text-pink-900',
  },
  'cherry-red': {
    name: 'Cherry Red',
    bg: 'bg-gradient-to-br from-red-800 via-red-700 to-rose-900',
    text: 'text-white',
    accent: 'text-red-200',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonText: 'text-white',
  },
  'navy-blue': {
    name: 'Navy Blue',
    bg: 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900',
    text: 'text-white',
    accent: 'text-blue-300',
    buttonBg: 'bg-blue-400/20 hover:bg-blue-400/30',
    buttonText: 'text-white',
  },
  'forest-green': {
    name: 'Forest Green',
    bg: 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900',
    text: 'text-white',
    accent: 'text-green-300',
    buttonBg: 'bg-green-400/20 hover:bg-green-400/30',
    buttonText: 'text-white',
  },
  'ocean-teal': {
    name: 'Ocean Teal',
    bg: 'bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700',
    text: 'text-white',
    accent: 'text-teal-200',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonText: 'text-white',
  },
  'sunset-orange': {
    name: 'Sunset Orange',
    bg: 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500',
    text: 'text-white',
    accent: 'text-orange-100',
    buttonBg: 'bg-white/20 hover:bg-white/30',
    buttonText: 'text-white',
  },
  'lavender-dream': {
    name: 'Lavender Dream',
    bg: 'bg-gradient-to-br from-purple-200 via-violet-200 to-pink-200',
    text: 'text-purple-900',
    accent: 'text-purple-600',
    buttonBg: 'bg-purple-500/20 hover:bg-purple-500/30',
    buttonText: 'text-purple-900',
  },
  'midnight-purple': {
    name: 'Midnight Purple',
    bg: 'bg-gradient-to-br from-purple-950 via-violet-900 to-fuchsia-950',
    text: 'text-white',
    accent: 'text-purple-300',
    buttonBg: 'bg-purple-400/20 hover:bg-purple-400/30',
    buttonText: 'text-white',
  },
  'custom-ai': {
    name: 'AI Generated',
    bg: 'bg-black',
    text: 'text-white',
    accent: 'text-gray-400',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonText: 'text-white',
  },
};

export const fontStyles = {
  modern: {
    name: 'Modern',
    className: 'font-sans',
    style: { fontFamily: 'system-ui, -apple-system, sans-serif' },
  },
  classic: {
    name: 'Classic Serif',
    className: '',
    style: { fontFamily: '"Playfair Display", serif' },
  },
  nyt: {
    name: 'NYT Style',
    className: '',
    style: { fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 },
  },
  digital: {
    name: 'Digital',
    className: '',
    style: { fontFamily: '"Orbitron", sans-serif' },
  },
  elegant: {
    name: 'Elegant',
    className: '',
    style: { fontFamily: '"Dancing Script", cursive' },
  },
  bold: {
    name: 'Bold Display',
    className: '',
    style: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em' },
  },
  handwritten: {
    name: 'Typewriter',
    className: '',
    style: { fontFamily: '"Space Mono", monospace' },
  },
};

export const predefined3DBackgrounds = [
  {
    id: '3d-castle',
    name: '3D Castle',
    prompt: 'epic 3d fantasy castle on mountain with dramatic lighting digital art',
  },
  {
    id: '3d-forest',
    name: '3D Forest',
    prompt: '3d magical forest with glowing mushrooms and fireflies digital art',
  },
  {
    id: '3d-space',
    name: '3D Space',
    prompt: '3d space station with earth view and stars digital art',
  },
  {
    id: '3d-underwater',
    name: '3D Underwater',
    prompt: '3d underwater coral reef with tropical fish digital art',
  },
  {
    id: '3d-mountains',
    name: '3D Mountains',
    prompt: '3d snowy mountain peaks at sunset with clouds digital art',
  },
  {
    id: '3d-city',
    name: '3D Futuristic City',
    prompt: '3d futuristic cyberpunk city with neon lights digital art',
  },
  {
    id: '3d-dragon',
    name: '3D Dragon',
    prompt: '3d majestic dragon flying over clouds digital art',
  },
  {
    id: '3d-zen',
    name: '3D Zen Garden',
    prompt: '3d japanese zen garden with cherry blossoms and pond digital art',
  },
];
