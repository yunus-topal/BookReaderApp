import { useAppTheme } from '@theme/ThemeProvider';
import { StyleSheet } from 'react-native';

export const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;

  return StyleSheet.create({
    // base container styles
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
      backgroundColor: 'rgba(15,23,42,0.96)',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: 'rgba(148,163,184,0.6)',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontWeight: '600',
      fontSize: 14,
      color: '#e5e7eb',
    },
    content: {
      marginTop: 8,
      gap: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 12,
      color: '#9ca3af',
    },

    // font family styles
    fontRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'flex-end',
    },
    fontChip: {
      width: 40,
      height: 40,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: '#4b5563',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fontChipActive: {
      backgroundColor: '#e5e7eb',
      borderColor: '#e5e7eb',
    },
    fontSample: {
      fontSize: 20,
      color: '#e5e7eb',
    },
    fontSampleActive: {
      color: '#111827',
      fontWeight: '700',
    },

    // font size styles
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
      color: '#9ca3af',
      marginRight: 2, // bring closer to slider
      marginLeft: 48,
    },

    sliderLabelLarge: {
      fontSize: 18,
      color: '#e5e7eb',
      marginLeft: 2, // bring closer to slider
    },

    // theme styles

    circleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    circle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: 'transparent',
    },

    circleActive: {
      borderColor: '#4ea1ff', // highlight color
      borderWidth: 3,
    },
  });
};
