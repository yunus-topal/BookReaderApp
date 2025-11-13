// src/screens/settingsScreenStyles.ts
import { AppTheme } from '@theme/themes';
import { StyleSheet } from 'react-native';

const createStyles = (theme: AppTheme) => {
  const palette = theme.appPalette;


  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.background,
    },
    content: {
      padding: 16,
    },
    sectionTitle: {
      marginBottom: 16,
    },
    groupContainer: {
      marginBottom: 8,
    },
    groupLabel: {
      marginBottom: 4,
      opacity: 0.7,
    },
    groupCard: {
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: palette.border,
    },
  });
}

export default createStyles;