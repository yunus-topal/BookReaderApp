import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: '#111820',
    borderRadius: 14,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  empty: { justifyContent: 'center' },
  emptyText: { color: '#7b8a97' },
  cover: { width: 56, height: 80, borderRadius: 8, backgroundColor: '#1a2633' },
  coverPlaceholder: { borderWidth: 1, borderColor: '#223040' },
  name: { color: '#e6edf3', fontWeight: '700', fontSize: 16 },
  meta: { color: '#9db1c6', marginTop: 4 },
});

export default styles;