// src/screens/settingsScreenStyles.ts
import { AppTheme } from '@theme/themes';
import { StyleSheet } from 'react-native';
import { spacing } from '@theme';

const createStyles = (theme: AppTheme) => {
  const palette = theme.appPalette;

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.background,
    },
    content: {
      padding: spacing.lg,
    },
    sectionTitle: {
      marginBottom: spacing.lg,
    },
    groupContainer: {
      marginBottom: spacing.sm,
    },
    groupLabel: {
      marginBottom: spacing.xs,
      opacity: 0.7,
    },
    groupCard: {
      borderRadius: spacing.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: palette.border,
    },
  });
}

export default createStyles;