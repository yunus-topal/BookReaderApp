import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f14', padding: spacing.lg },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: { color: '#e6edf3', fontSize: 28, fontWeight: '700' },
  pickBtn: {
    backgroundColor: '#4ea1ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  pickBtnText: { color: '#08111a', fontWeight: '700' },
});

export default styles;