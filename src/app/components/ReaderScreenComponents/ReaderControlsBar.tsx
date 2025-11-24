import { READER_THEMES, ReaderSettings, ReaderTheme } from '@app/types';
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  visible: boolean;
  expanded: boolean;
  onToggleExpanded: () => void;
  settings: ReaderSettings;
  updateSettings: (patch: Partial<ReaderSettings>) => void;
}

const FONT_OPTIONS: { key: ReaderSettings['fontFamily']; previewFamily: string }[] = [
  { key: 'lora', previewFamily: 'Lora-Regular' },
  { key: 'roboto', previewFamily: 'Roboto-Regular' },
  { key: 'courier', previewFamily: 'Courier' }, // system mono
  { key: 'handwriting', previewFamily: 'Schoolbell-Regular' },
  { key: 'medieval', previewFamily: 'MedievalSharp-Regular' },
];

const FONT_SIZE_KEYS: ReaderSettings['fontSize'][] = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
];

const sliderValueFromFontSize = (size: ReaderSettings['fontSize']) => {
  const idx = FONT_SIZE_KEYS.indexOf(size);
  return idx === -1 ? 2 : idx; // default to 'medium'
};

const fontSizeFromSliderValue = (value: number): ReaderSettings['fontSize'] => {
  const idx = Math.round(value);
  return FONT_SIZE_KEYS[idx] ?? 'medium';
};

const themeOptions = (Object.keys(READER_THEMES) as ReaderTheme[]).map(key => ({
  key,
  color: READER_THEMES[key].body.background,
}));

export function ReaderControlsBar({
  visible,
  expanded,
  onToggleExpanded,
  settings,
  updateSettings,
}: Props) {
  if (!visible) return null;
  const { theme, layoutMode, fontFamily, fontSize } = settings;

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

            <View style={styles.circleRow}>
              {themeOptions.map(({ key, color }) => (
                <Pressable
                  key={key}
                  onPress={() => updateSettings({ theme: key })}
                  style={[
                    styles.circle,
                    { backgroundColor: color },
                    theme === key && styles.circleActive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* FONT FAMILY ROW */}
          <View style={styles.row}>
            <Text style={styles.label}>Font</Text>
            <View style={styles.fontRow}>
              {FONT_OPTIONS.map(opt => (
                <Pressable
                  key={opt.key}
                  style={[styles.fontChip, fontFamily === opt.key && styles.fontChipActive]}
                  onPress={() => updateSettings({ fontFamily: opt.key })}
                >
                  <Text
                    style={[
                      styles.fontSample,
                      { fontFamily: opt.previewFamily },
                      fontFamily === opt.key && styles.fontSampleActive,
                    ]}
                  >
                    Aa
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          {/* FONT SIZE ROW */}
          <View style={styles.row}>
            <Text style={styles.label}>Text size</Text>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabelSmall}>A</Text>

              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={4}
                step={1}
                value={sliderValueFromFontSize(fontSize)}
                onValueChange={value => {
                  const next = fontSizeFromSliderValue(value);
                  if (next !== fontSize) {
                    updateSettings({ fontSize: next });
                  }
                }}
                minimumTrackTintColor="#e5e7eb"
                maximumTrackTintColor="#4b5563"
                thumbTintColor="#e5e7eb"
              />

              <Text style={styles.sliderLabelLarge}>A</Text>
            </View>
          </View>
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
  fontRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-end',
  },
  fontChip: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4b5563',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontChipActive: {
    backgroundColor: '#e5e7eb',
    borderColor: '#e5e7eb',
  },
  fontSample: {
    fontSize: 20,
    color: '#e5e7eb',
  },
  fontSampleActive: {
    color: '#111827',
    fontWeight: '700',
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  circleActive: {
    borderColor: '#4ea1ff', // highlight color
    borderWidth: 3,
  },
  // slider for font size
sliderContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},

  slider: {
    flex: 1,
  },

sliderLabelSmall: {
  fontSize: 12,
  color: '#9ca3af',
  marginRight: 2,  // bring closer to slider
  marginLeft: 48
},

sliderLabelLarge: {
  fontSize: 18,
  color: '#e5e7eb',
  marginLeft: 2,   // bring closer to slider
},
});
