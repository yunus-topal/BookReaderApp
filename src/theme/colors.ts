// src/theme/colors.ts

export const baseColors = {
  black: '#020617',
  white: '#ffffff',
};

export const palettes = {
  // 🔵 INDIGO
  indigoDark: {
    background: '#020617',
    surface: '#0f172a',
    surfaceSoft: '#1e293b',
    primary: '#4f46e5',
    primarySoft: '#6366f1',
    title: '#e5e7eb',
    text: '#cbd5f5',
    subtle: '#9ca3af',
    border: '#1f2937',
    danger: '#b91c1c',
    mode: 'dark' as const,
  },
  indigoLight: {
    background: '#f3f4ff',
    surface: '#ffffff',
    surfaceSoft: '#e5e7ff',
    primary: '#4f46e5',
    primarySoft: '#6366f1',
    title: '#020617',
    text: '#111827',
    subtle: '#6b7280',
    border: '#d1d5db',
    danger: '#b91c1c',
    mode: 'light' as const,
  },

  // 💚 EMERALD
  emeraldDark: {
    background: '#03110d',      // deep green-black
    surface: '#062019',         // dark emerald surface
    surfaceSoft: '#0b3a2d',
    primary: '#10b981',
    primarySoft: '#34d399',
    title: '#ecfdf5',
    text: '#d1fae5',
    subtle: '#6b7280',
    border: '#064e3b',
    danger: '#b91c1c',
    mode: 'dark' as const,
  },

  emeraldLight: {
    background: '#ecfdf5',
    surface: '#ffffff',
    surfaceSoft: '#d1fae5',
    primary: '#059669',
    primarySoft: '#34d399',
    title: '#022c22',
    text: '#064e3b',
    subtle: '#6b7280',
    border: '#a7f3d0',
    danger: '#b91c1c',
    mode: 'light' as const,
  },

  // 📖 SEPIA / BOOK
  sepiaDark: {
    background: '#1b130a',
    surface: '#24140a',
    surfaceSoft: '#3b2414',
    primary: '#f59e0b',
    primarySoft: '#fbbf24',
    title: '#fef3c7',
    text: '#fde68a',
    subtle: '#d1d5db',
    border: '#4b2c18',
    danger: '#b91c1c',
    mode: 'dark' as const,
  },
  sepiaLight: {
    background: '#fdf6e3',
    surface: '#fefcf5',
    surfaceSoft: '#f5e6c8',
    primary: '#d97706',
    primarySoft: '#f59e0b',
    title: '#3f2a14',
    text: '#4b3120',
    subtle: '#7c6a54',
    border: '#e5d3b3',
    danger: '#b91c1c',
    mode: 'light' as const,
  },
};

export type PaletteName = keyof typeof palettes;
export type AppPalette = (typeof palettes)[PaletteName];
