import { Theme } from '@epubjs-react-native/core';
import { createContext } from 'react';

export type ReadingLayoutMode = 'paged' | 'scroll'; // maybe more later: 'two-page', etc.

export type PageTurnControlMode = 'swipe' | 'buttons' | 'volumeButtons' | 'swipeAndButtons' | 'all';

export type ReaderTheme = 'light' | 'dark' | 'indigo' | 'sepia' | 'emerald';

export type ReaderFontFamily = 'lora' | 'roboto' | 'courier' | 'handwriting' | 'medieval';
export type ReaderFontSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export interface ReaderSettings {
  layoutMode: ReadingLayoutMode;
  pageTurnControl: PageTurnControlMode;
  theme: ReaderTheme;
  // future: fontSize, lineHeight, theme, margin, etc.

  fontFamily: ReaderFontFamily;
  fontSize: ReaderFontSize;
}

export const defaultReaderSettings: ReaderSettings = {
  layoutMode: 'paged',
  pageTurnControl: 'swipe',
  theme: 'light',
  fontFamily: 'lora',
  fontSize: 'medium',
};

export interface ReaderSettingsContextValue {
  settings: ReaderSettings;
  /**
   * Replace all settings at once.
   */
  setSettings: (next: ReaderSettings) => void;
  /**
   * Update only some fields (partial update).
   */
  updateSettings: (patch: Partial<ReaderSettings>) => void;
  /**
   * True when settings are loaded from storage.
   * You can use this to avoid flicker if you want.
   */
  isLoaded: boolean;
}

export const ReaderSettingsContext = createContext<ReaderSettingsContextValue | undefined>(
  undefined,
);

export const LIGHT_THEME = {
  body: {
    background: '#ffffff',
    color: '#000000',
  },
};

export const DARK_THEME = {
  body: {
    background: '#000000',
    color: '#ffffff',
  },
};

export const INDIGO_THEME = {
  body: {
    background: '#1e1b4b',   // deep indigo background
    color: '#e0e7ff',        // soft indigo-100 text
  },
};

export const SEPIA_THEME = {
  body: {
    background: '#f4ecd8',   // classic sepia tone
    color: '#5b4636',        // warm brown text
  },
};

export const EMERALD_THEME = {
  body: {
    background: '#022c22',   // soft emerald-dark background
    color: '#d1fae5',        // mint text
  },
};


export const READER_THEMES: Record<ReaderTheme, Theme> = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  indigo: INDIGO_THEME,
  sepia: SEPIA_THEME,
  emerald: EMERALD_THEME,
};