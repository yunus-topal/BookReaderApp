import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { spacing } from '@theme/spacing';
import { DocumentMeta } from '@app/types';

interface Props {
  document?: DocumentMeta | null;
  onPress?: () => void;
}

export default function ContinueCard({ document, onPress }: Props) {
  if (!document) {
    return (
      <View style={[styles.card, styles.empty]}>
        <Text style={styles.emptyText}>
          No recent book. Pick one to start reading.
        </Text>
      </View>
    );
  }
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {document.coverUri ? (
        <Image source={{ uri: document.coverUri }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]} />
      )}
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.name}>
          {document.name}
        </Text>
        <Text style={styles.meta}>
          Progress: {Math.round((document.lastPosition ?? 0) * 100)}%
        </Text>
      </View>
    </Pressable>
  );
}

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
