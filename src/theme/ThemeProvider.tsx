// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { appThemes, AppThemeName, AppTheme } from './themes';
import { getSavedThemeName, setSavedThemeName } from '@app/services/documents';

type ThemeContextValue = {
  theme: AppTheme;
  themeName: AppThemeName;
  setThemeName: (name: AppThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used inside AppThemeProvider');
  return ctx;
};

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // default theme – you can set to any of the keys from appThemes
  const [themeName, setThemeNameState] = useState<AppThemeName>('indigoDark');

  const theme = useMemo(() => appThemes[themeName], [themeName]);

    useEffect(() => {
    (async () => {
      const saved = await getSavedThemeName();
      if (saved) setThemeName(saved);
      })();
    }, []);

  const setThemeName = (name: AppThemeName) => {
    setThemeNameState(name);
    setSavedThemeName(name);
  };

  const value: ThemeContextValue = {
    theme,
    themeName,
    setThemeName,
  };

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
