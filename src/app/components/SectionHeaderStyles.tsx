import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: { color: '#9db1c6', fontWeight: '700', letterSpacing: 0.3 },
  action: { color: '#4ea1ff', fontWeight: '700' },
});

export default styles;