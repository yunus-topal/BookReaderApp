import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: '#0f141b',
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  thumb: { width: 40, height: 56, borderRadius: 6, backgroundColor: '#1a2633' },
  thumbPlaceholder: { borderWidth: 1, borderColor: '#223040' },
  name: { color: '#e6edf3', fontWeight: '600' },
  meta: { color: '#7b8a97', marginTop: 2, fontSize: 12 },
  empty: { color: '#7b8a97', textAlign: 'center', marginTop: 20 },
});

export default styles;