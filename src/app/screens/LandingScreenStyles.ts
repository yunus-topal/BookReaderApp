import { StyleSheet } from 'react-native';
import type { AppTheme } from '@theme/themes';

function createLandingStyles(theme: AppTheme) {
  const palette = theme.appPalette;

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 32,
      paddingBottom: 16,
      backgroundColor: palette.background,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: palette.title,
    },
    pickBtn: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: palette.primary,
      justifyContent: 'center',
      alignItems: 'center',
      // nice little shadow for Android/iOS
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    pickBtnText: {
      color: palette.title,
      fontWeight: '600',
      fontSize: 14,
    },

    // Optional shared styles if you want to reuse them
    sectionHeaderContainer: {
      marginTop: 16,
      marginBottom: 8,
    },
    sectionHeaderTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: palette.text,
    },
    sectionHeaderAction: {
      fontSize: 12,
      color: palette.primarySoft,
    },

    // In case you want card-like backgrounds for ContinueCard / RecentList items
    card: {
      backgroundColor: palette.surface,
      borderRadius: 12,
      padding: 12,
      marginBottom: 8,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.border,
    },
    cardTitle: {
      color: palette.text,
      fontSize: 14,
      fontWeight: '500',
    },
    cardSubtitle: {
      color: palette.subtle,
      fontSize: 12,
      marginTop: 2,
    },
  });
}

export default createLandingStyles;
