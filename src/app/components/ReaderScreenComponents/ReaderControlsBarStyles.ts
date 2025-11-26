// src/components/ReaderControlsBarStyles.ts
import { useAppTheme } from '@theme/ThemeProvider';
import { StyleSheet } from 'react-native';
import { spacing, layout } from '@theme/spacing';

export const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;
  const isDark = palette.mode === 'dark';

  return StyleSheet.create({
    // base container styles
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: layout.screenPadding,
      paddingTop: spacing.sm,
      paddingBottom: spacing.lg,

      // semi-transparent overlay over the reader
      backgroundColor: isDark
        ? 'rgba(15, 23, 42, 0.96)' // close to indigo dark surface
        : 'rgba(255, 255, 255, 0.96)',

      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: palette.border,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    title: {
      fontWeight: '600',
      fontSize: 14,
      color: palette.title,
    },

    content: {
      marginTop: spacing.xs,
      rowGap: spacing.md,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.xs,
    },

    label: {
      fontSize: 12,
      color: palette.subtle,
    },

    // FONT FAMILY
    fontRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    fontChip: {
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.border,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.xs,
    },

    fontChipActive: {
      backgroundColor: palette.surfaceSoft,
      borderColor: palette.primarySoft,
    },

    fontSample: {
      fontSize: 18,
      color: palette.text,
    },

    fontSampleActive: {
      color: palette.title,
      fontWeight: '700',
    },

    // FONT SIZE
    sliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },

    slider: {
      flex: 1,
    },

    sliderLabelSmall: {
      fontSize: 12,
      color: palette.subtle,
      marginLeft: spacing.xl,
    },

    sliderLabelLarge: {
      fontSize: 18,
      color: palette.subtle,
      marginRight: spacing.md,
      marginLeft: spacing.sm,
    },

    // THEME CIRCLES
    circleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    circle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      // subtle outline so even a white theme circle is visible
      borderWidth: 1,
      borderColor: palette.border,
      marginLeft: spacing.xs,
    },

    circleActive: {
      // stronger border for the selected theme
      borderColor: palette.primarySoft,
      borderWidth: 2,
    },
  });
};
