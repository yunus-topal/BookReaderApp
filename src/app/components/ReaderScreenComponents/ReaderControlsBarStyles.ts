// src/components/ReaderControlsBarStyles.ts
import { useAppTheme } from '@theme/ThemeProvider';
import { StyleSheet } from 'react-native';
import { spacing, layout } from '@theme/spacing';

// Generic helper to turn #rrggbb into rgba(...)
const hexToRgba = (hex: string, alpha: number) => {
  if (!hex || typeof hex !== 'string') return hex;
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map(ch => ch + ch)
      .join('');
  }
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;
  const isDark = palette.mode === 'dark';

  const overlayAlpha = isDark ? 0.96 : 0.94;

  return StyleSheet.create({
    // MAIN CONTAINER
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: layout.screenPadding,

      // semi-transparent version of the current theme surface
      backgroundColor: hexToRgba(palette.surface, overlayAlpha),

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
      marginBottom: spacing.md,
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
      marginRight: spacing.sm,
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
      // always visible, even for white theme circle
      borderWidth: 1,
      borderColor: palette.border,
      marginLeft: spacing.xs,
    },

    circleActive: {
      borderColor: palette.primarySoft,
      borderWidth: 2,
    },
  });
};
