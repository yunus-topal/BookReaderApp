import { StyleSheet } from 'react-native';
import { spacing } from '@theme';
import { useAppTheme } from '@theme/ThemeProvider';

const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },

    title: {
      color: palette.subtle,
      fontWeight: '700',
      letterSpacing: 0.3,
    },

    action: {
      color: palette.primarySoft,
      fontWeight: '700',
    },
  });
};

export default createStyles;