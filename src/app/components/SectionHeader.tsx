import { View, Text, Pressable } from 'react-native';
import styles from './SectionHeaderStyles';

interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void | Promise<void>;
}

export default function SectionHeader({ title, actionLabel, onAction }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onAction}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

