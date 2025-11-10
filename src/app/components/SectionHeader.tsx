import { spacing } from '@theme/spacing';
import { View, Text, StyleSheet, Pressable } from 'react-native';

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
