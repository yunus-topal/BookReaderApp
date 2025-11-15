import { StyleSheet } from 'react-native';
import { spacing } from '@theme';
import { useAppTheme } from '@theme/ThemeProvider';

const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.md,
      backgroundColor: palette.surfaceSoft,
      padding: spacing.md,
      borderRadius: spacing.lg,
      alignItems: 'center',
      marginBottom: spacing.sm,
    },

    thumb: {
      width: 40,
      height: 56,
      borderRadius: spacing.sm,
      backgroundColor: palette.surface,
    },

    thumbPlaceholder: {
      borderWidth: 1,
      borderColor: palette.border,
    },

    name: {
      color: palette.title,
      fontWeight: '600',
    },

    meta: {
      color: palette.subtle,
      marginTop: spacing.xs,
      fontSize: 12,
    },

    empty: {
      color: palette.subtle,
      textAlign: 'center',
      marginTop: spacing.xl,
    },
  });
}




export default createStyles;
