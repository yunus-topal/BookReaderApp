// src/components/ContinueCardStyles.tsx
import { StyleSheet } from 'react-native';
import { spacing } from '@theme';
import { useAppTheme } from '@theme/ThemeProvider';

const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;

  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      gap: spacing.md,
      backgroundColor: palette.surfaceSoft,
      borderRadius: spacing.lg,
      padding: spacing.md,
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    empty: {
      justifyContent: 'center',
    },
    emptyText: {
      color: palette.subtle,
    },
    cover: {
      width: 56,
      height: 80,
      borderRadius: spacing.sm,
      backgroundColor: palette.surface,
    },
    coverPlaceholder: {
      borderWidth: 1,
      borderColor: palette.border,
    },
    name: {
      color: palette.title,
      fontWeight: '700',
      fontSize: 16,
    },
    meta: {
      color: palette.text,
      marginTop: spacing.xs,
    },
  });
};


export default createStyles;
