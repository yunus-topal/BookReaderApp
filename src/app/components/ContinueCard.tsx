import { View, Text, Pressable, Image } from 'react-native';
import { DocumentMeta } from '@app/types';
import styles from './ContinueCardStyles';

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

