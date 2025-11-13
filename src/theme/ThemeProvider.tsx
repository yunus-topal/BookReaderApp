// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { appThemes, AppThemeName, AppTheme } from './themes';

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
  const [themeName, setThemeName] = useState<AppThemeName>('indigoDark');

  const theme = useMemo(() => appThemes[themeName], [themeName]);

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
