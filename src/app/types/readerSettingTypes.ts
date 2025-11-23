import { createContext } from 'react';

export type ReadingLayoutMode = 'paged' | 'scroll'; // maybe more later: 'two-page', etc.

export type PageTurnControlMode = 'swipe' | 'buttons' | 'volumeButtons' | 'swipeAndButtons' | 'all';

export type ReaderTheme = 'light' | 'dark';

export interface ReaderSettings {
  layoutMode: ReadingLayoutMode;
  pageTurnControl: PageTurnControlMode;
  theme: ReaderTheme;
  // future: fontSize, lineHeight, theme, margin, etc.
}

export const defaultReaderSettings: ReaderSettings = {
  layoutMode: 'paged',
  pageTurnControl: 'swipe',
  theme: 'light',
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

export const DARK_THEME = {
  body: {
    background: '#000000',
    color: '#ffffff',
  },
};

export const LIGHT_THEME = {
  body: {
    background: '#ffffff',
    color: '#000000',
  },
};