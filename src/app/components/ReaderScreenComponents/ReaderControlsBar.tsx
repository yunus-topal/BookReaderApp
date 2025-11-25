import { ReaderFontFamily, ReaderSettings } from '@app/types';
import { View, Text, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ReaderFontSizeControls } from './ReaderControlBarComponents/ReaderFontSizeControls';
import { ReaderThemeControls } from './ReaderControlBarComponents/ReaderThemeControls';
import { createStyles } from './ReaderControlsBarStyles';

interface Props {
  visible: boolean;
  expanded: boolean;
  onToggleExpanded: () => void;
  settings: ReaderSettings;
  updateSettings: (patch: Partial<ReaderSettings>) => void;
}

const FONT_OPTIONS: { key: ReaderFontFamily; previewFamily: string }[] = [
  { key: 'serif', previewFamily: 'serif' },
  { key: 'sans-serif', previewFamily: 'sans-serif' },
  { key: 'monospace', previewFamily: 'monospace' },
];

export function ReaderControlsBar({
  visible,
  expanded,
  onToggleExpanded,
  settings,
  updateSettings,
}: Props) {
  if (!visible) return null;
  const { theme, fontFamily, fontSize } = settings;
  const styles = createStyles();

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

          <ReaderThemeControls theme={theme} onChangeTheme={(theme) => updateSettings({ theme })} />

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

          <ReaderFontSizeControls fontSize={fontSize} onChangeFontSize={(fontSize) => updateSettings({ fontSize })} />
        </View>
      )}
    </View>
  );
}