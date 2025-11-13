import { DocumentMeta } from '@app/types';
import {
  FlatList,
  Pressable,
  Text,
  View,
  Image,
} from 'react-native';
import styles from './RecentListStyles';

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
