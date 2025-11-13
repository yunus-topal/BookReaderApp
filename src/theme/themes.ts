// src/theme/themes.ts
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { palettes, PaletteName, AppPalette } from './colors';

export type AppThemeName = PaletteName;

export type AppTheme = typeof MD3DarkTheme & {
  appPalette: AppPalette;
};

function makeTheme(palette: AppPalette): AppTheme {
  const base = palette.mode === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return {
    ...base,
    dark: palette.mode === 'dark',
    colors: {
      ...base.colors,
      background: palette.background,
      primary: palette.primary,
      surface: palette.surface,
      outline: palette.border,
      error: palette.danger,
      onSurface: palette.text,
      onBackground: palette.text,
    },
    appPalette: palette,
  };
}

export const appThemes: Record<AppThemeName, AppTheme> = {
  indigoDark: makeTheme(palettes.indigoDark),
  indigoLight: makeTheme(palettes.indigoLight),

  emeraldDark: makeTheme(palettes.emeraldDark),
  emeraldLight: makeTheme(palettes.emeraldLight),

  sepiaDark: makeTheme(palettes.sepiaDark),
  sepiaLight: makeTheme(palettes.sepiaLight),
};
