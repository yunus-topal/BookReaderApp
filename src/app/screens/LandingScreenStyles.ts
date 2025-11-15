import { StyleSheet } from 'react-native';
import { AppTheme, spacing } from '@theme';

const createStyles = (theme: AppTheme) => {
  const palette = theme.appPalette;

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xxl,
      paddingBottom: spacing.lg,
      backgroundColor: palette.background,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: palette.title,
    },
    pickBtn: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
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
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
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
      borderRadius: spacing.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
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
      marginTop: spacing.xs,
    },
  });
}

export default createStyles;
