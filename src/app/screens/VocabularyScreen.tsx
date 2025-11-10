import { View, Text, StyleSheet } from 'react-native';

export default function VocabularyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Last checked words (placeholder)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f14', padding: 16 },
  text: { color: '#e6edf3' },
});
