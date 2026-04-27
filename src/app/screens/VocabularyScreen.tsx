import { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  UIManager,
  Platform,
} from 'react-native';
import { getDictionary } from '@app/services/dictionary';
import createStyles from './VocabularyScreenStyles';
import { useAppTheme } from '@theme/ThemeProvider';
import { DictionaryEntry } from '@app/types/dictionaryTypes';
import { EntryCard } from '@app/components/VocabularyScreenComponents/EntryCard';
import { useNavigation } from '@react-navigation/native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const VocabularyScreen = () => {
  const styles = createStyles();
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const palette = theme.appPalette;

  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const dict = await getDictionary();
      const list: DictionaryEntry[] = Object.values(dict);
      setEntries(list);
      setLoading(false);
    }
    load();
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  // Unique document list for filter chips
  const documents = useMemo(() => {
    const seen = new Map<string, string>(); // documentId → documentName
    for (const e of entries) {
      if (!seen.has(e.documentId)) seen.set(e.documentId, e.documentName);
    }
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
  }, [entries]);

  // Filtered + searched entries
  const filtered = useMemo(() => {
    return entries.filter(e => {
      const matchDoc = !selectedDoc || e.documentId === selectedDoc;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        e.germanText.toLowerCase().includes(q) ||
        e.englishDefinition.toLowerCase().includes(q);
      return matchDoc && matchSearch;
    });
  }, [entries, selectedDoc, search]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Vocabulary</Text>
        <Text style={styles.subtitle}>{filtered.length} words</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search German or English…"
          placeholderTextColor={palette.subtle}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Document filter chips */}
      {documents.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          style={styles.chipsScroll}
        >
          <TouchableOpacity
            style={[styles.chip, !selectedDoc && styles.chipActive]}
            onPress={() => setSelectedDoc(null)}
          >
            <Text style={[styles.chipText, !selectedDoc && styles.chipTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {documents.map(doc => (
            <TouchableOpacity
              key={doc.id}
              style={[styles.chip, selectedDoc === doc.id && styles.chipActive]}
              onPress={() => setSelectedDoc(prev => (prev === doc.id ? null : doc.id))}
            >
              <Text
                style={[styles.chipText, selectedDoc === doc.id && styles.chipTextActive]}
                numberOfLines={1}
              >
                {doc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* List */}
      {loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading…</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📖</Text>
          <Text style={styles.emptyText}>No words found</Text>
          <Text style={styles.emptyHint}>Try adjusting your filters or search</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <EntryCard entry={item}/>}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

export default VocabularyScreen;