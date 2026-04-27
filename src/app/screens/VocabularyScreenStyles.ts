import { spacing } from '@theme/spacing';
import { useAppTheme } from '@theme/ThemeProvider';
import { StyleSheet } from 'react-native';


const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background,
      paddingTop: spacing.xxl,
    },

    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: palette.title,
    },
    subtitle: {
      fontSize: 13,
      color: palette.subtle,
      fontWeight: '500',
    },

    // Search
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: spacing.lg,
      marginBottom: spacing.sm,
      backgroundColor: palette.surface,
      borderRadius: 12,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    searchIcon: {
      fontSize: 18,
      color: palette.subtle,
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      fontSize: 15,
      color: palette.text,
      paddingVertical: 0,
    },
    clearBtn: {
      fontSize: 13,
      color: palette.subtle,
      paddingLeft: spacing.sm,
    },

    // Chips
    chipsScroll: {
      marginBottom: spacing.sm,
    },
    chipsRow: {
      paddingHorizontal: spacing.lg,
      gap: spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
    },
    chip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      maxWidth: 160,
    },
    chipActive: {
      backgroundColor: palette.primary,
      borderColor: palette.primary,
    },
    chipText: {
      fontSize: 13,
      color: palette.text,
      fontWeight: '500',
    },
    chipTextActive: {
      color: palette.title,
      fontWeight: '600',
    },

    // List
    list: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxl,
      paddingTop: spacing.xs,
    },

    // Card
    card: {
      backgroundColor: palette.surface,
      borderRadius: 14,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.border,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    cardWords: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: spacing.xs,
    },
    germanText: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.title,
    },
    divider: {
      fontSize: 14,
      color: palette.primarySoft,
      fontWeight: '600',
    },
    englishText: {
      fontSize: 15,
      color: palette.text,
      fontWeight: '400',
      flexShrink: 1,
    },
    expandIcon: {
      fontSize: 22,
      color: palette.subtle,
      lineHeight: 24,
      transform: [{ rotate: '0deg' }],
      marginLeft: spacing.sm,
    },
    expandIconOpen: {
      transform: [{ rotate: '90deg' }],
    },

    // Doc badge
    docBadge: {
      alignSelf: 'flex-start',
      marginTop: spacing.xs,
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: 6,
      backgroundColor: palette.background,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.border,
    },
    docBadgeText: {
      fontSize: 11,
      color: palette.subtle,
      fontWeight: '500',
    },

    // Samples
    samplesContainer: {
      marginTop: spacing.md,
      paddingTop: spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: palette.border,
    },
    samplesLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: palette.primarySoft,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: spacing.xs,
    },
    sampleRow: {
      flexDirection: 'row',
      gap: spacing.xs,
      marginBottom: spacing.xs,
    },
    sampleBullet: {
      color: palette.primarySoft,
      fontSize: 13,
      lineHeight: 20,
    },
    sampleText: {
      flex: 1,
      fontSize: 13,
      color: palette.text,
      lineHeight: 20,
    },

    // Empty state
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    emptyEmoji: {
      fontSize: 48,
    },
    emptyText: {
      fontSize: 17,
      fontWeight: '600',
      color: palette.text,
    },
    emptyHint: {
      fontSize: 14,
      color: palette.subtle,
    },
  });
};

export default createStyles;