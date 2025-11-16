// src/hooks/useReaderSettings.ts
import {
  useCallback,
  useContext,
} from 'react';
import { ReaderSettingsContext, type ReaderSettings, type ReaderSettingsContextValue } from '@app/types/';


export const useReaderSettings = (): ReaderSettingsContextValue => {
  const ctx = useContext(ReaderSettingsContext);
  if (!ctx) {
    throw new Error('useReaderSettings must be used inside ReaderSettingsProvider');
  }
  return ctx;
};

/**
 * Convenience hook for a single field:
 *   const [layoutMode, setLayoutMode] = useReaderSetting('layoutMode');
 */
export const useReaderSetting = <K extends keyof ReaderSettings>(
  key: K
): [ReaderSettings[K], (value: ReaderSettings[K]) => Promise<void>] => {
  const { settings, updateSettings } = useReaderSettings();

  const setValue = useCallback(
    async (value: ReaderSettings[K]) => {
      await updateSettings({ [key]: value } as Partial<ReaderSettings>);
    },
    [key, updateSettings]
  );

  return [settings[key], setValue];
};