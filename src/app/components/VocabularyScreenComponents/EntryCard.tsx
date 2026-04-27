import createStyles from "@app/screens/VocabularyScreenStyles";
import { DictionaryEntry } from "@app/types/dictionaryTypes";
import { useState } from "react";
import { LayoutAnimation, TouchableOpacity, View, Text } from "react-native";

export function EntryCard({ entry }: { entry: DictionaryEntry }) {
  const [expanded, setExpanded] = useState(false);
  const hasSamples = entry.samples && entry.samples.length > 0;
  const styles = createStyles();

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(v => !v);
  }

  return (
    <TouchableOpacity
      activeOpacity={hasSamples ? 0.75 : 1}
      onPress={hasSamples ? toggle : undefined}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardWords}>
          <Text style={styles.germanText}>{entry.germanText}</Text>
          <Text style={styles.divider}>→</Text>
          <Text style={styles.englishText}>{entry.englishDefinition}</Text>
        </View>
        {hasSamples && (
          <Text style={[styles.expandIcon, expanded && styles.expandIconOpen]}>
            ›
          </Text>
        )}
      </View>

      <View style={styles.docBadge}>
        <Text style={styles.docBadgeText}>{entry.documentName}</Text>
      </View>

      {expanded && hasSamples && (
        <View style={styles.samplesContainer}>
          <Text style={styles.samplesLabel}>Examples</Text>
          {entry.samples.map((sample, i) => (
            <View key={i} style={styles.sampleRow}>
              <Text style={styles.sampleBullet}>•</Text>
              <Text style={styles.sampleText}>{sample}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}