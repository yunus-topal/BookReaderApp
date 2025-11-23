import { ReaderSettings } from '@app/types';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  visible: boolean;
  expanded: boolean;
  onToggleExpanded: () => void;
  settings: ReaderSettings;
  updateSettings: (patch: Partial<ReaderSettings>) => void;
}

export function ReaderControlsBar({ visible, expanded, onToggleExpanded, settings, updateSettings }: Props) {

  if (!visible) return null;
  const { theme, layoutMode } = settings;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Reader settings</Text>

        <IconButton
          icon={expanded ? 'chevron-down' : 'chevron-up'}
          size={20}
          onPress={onToggleExpanded}
        />
      </View>

      {expanded && (
        <View style={styles.content}>
          {/* THEME ROW */}
          <View style={styles.row}>
            <Text style={styles.label}>Theme</Text>
            <View style={styles.chipRow}>
              <Pressable
                style={[styles.chip, theme === 'light' && styles.chipActive]}
                onPress={() => updateSettings({ theme: 'light' })}
              >
                <Text style={[styles.chipText, theme === 'light' && styles.chipTextActive]}>
                  Light
                </Text>
              </Pressable>
              <Pressable
                style={[styles.chip, theme === 'dark' && styles.chipActive]}
                onPress={() => updateSettings({ theme: 'dark' })}
              >
                <Text style={[styles.chipText, theme === 'dark' && styles.chipTextActive]}>
                  Dark
                </Text>
              </Pressable>
            </View>
          </View>

          {/* LAYOUT ROW */}
          <View style={styles.row}>
            <Text style={styles.label}>Layout</Text>
            <View style={styles.chipRow}>
              <Pressable
                style={[styles.chip, layoutMode === 'paged' && styles.chipActive]}
                onPress={() => updateSettings({ layoutMode: 'paged' })}
              >
                <Text style={[styles.chipText, layoutMode === 'paged' && styles.chipTextActive]}>
                  Pages
                </Text>
              </Pressable>
              <Pressable
                style={[styles.chip, layoutMode === 'scroll' && styles.chipActive]}
                onPress={() => updateSettings({ layoutMode: 'scroll' })}
              >
                <Text style={[styles.chipText, layoutMode === 'scroll' && styles.chipTextActive]}>
                  Scroll
                </Text>
              </Pressable>
            </View>
          </View>

          {/* later: font size, line height, etc */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: 'rgba(15,23,42,0.96)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(148,163,184,0.6)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#e5e7eb',
  },
  content: {
    marginTop: 8,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: '#9ca3af',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  chipActive: {
    backgroundColor: '#e5e7eb',
    borderColor: '#e5e7eb',
  },
  chipText: {
    fontSize: 12,
    color: '#e5e7eb',
  },
  chipTextActive: {
    color: '#111827',
    fontWeight: '600',
  },
});
