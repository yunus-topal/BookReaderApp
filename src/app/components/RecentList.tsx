import { DocumentMeta } from '@app/types';
import { spacing } from '@theme/spacing';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

interface Props {
  data: DocumentMeta[];
  onPressItem: (doc: DocumentMeta) => void | Promise<void>;
}

export default function RecentList({ data, onPressItem }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={it => it.id}
      contentContainerStyle={{ paddingBottom: 40 }}
      renderItem={({ item }) => (
        <Pressable style={styles.row} onPress={() => onPressItem(item)}>
          {item.coverUri ? (
            <Image source={{ uri: item.coverUri }} style={styles.thumb} />
          ) : (
            <View style={[styles.thumb, styles.thumbPlaceholder]} />
          )}
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <Text style={styles.meta}>
              {new Date(item.lastOpenedAt).toLocaleString()}
            </Text>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>No recent documents yet.</Text>
      }
    />
  );
}

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
