import { DocumentMeta } from '@app/types';
import {
  FlatList,
  Pressable,
  Text,
  View,
  Image,
} from 'react-native';
import createStyles from './RecentListStyles';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface Props {
  data: DocumentMeta[];
  onPressItem: (doc: DocumentMeta) => void | Promise<void>;
  onDeleteItem?: (doc: DocumentMeta) => void | Promise<void>;
}

export default function RecentList({ data, onPressItem, onDeleteItem }: Props) {
  const styles = createStyles();
    
  const renderRightActions = (item: DocumentMeta) => (
    <Pressable
      style={styles.deleteButton}
      onPress={() => onDeleteItem?.(item)}
    >
      <Text style={styles.deleteLabel}>Delete</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={it => it.id}
      contentContainerStyle={{ paddingBottom: 40 }}
      renderItem={({ item }) => (
        <Swipeable
          renderRightActions={() => renderRightActions(item)}
          overshootRight={false}
        >
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
        </Swipeable>
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>No recent documents yet.</Text>
      }
    />
  );
}
