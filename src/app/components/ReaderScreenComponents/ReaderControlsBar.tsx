import { ReaderSettings } from '@app/types';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ReaderFontSizeControls } from './ReaderControlBarComponents/ReaderFontSizeControls';
import { ReaderThemeControls } from './ReaderControlBarComponents/ReaderThemeControls';
import { createStyles } from './ReaderControlsBarStyles';
import { ReaderFontFamilyControls } from './ReaderControlBarComponents/ReaderFontFamilyControls';

interface Props {
  visible: boolean;
  expanded: boolean;
  onToggleExpanded: () => void;
  settings: ReaderSettings;
  updateSettings: (patch: Partial<ReaderSettings>) => void;
}

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
          <ReaderThemeControls theme={theme} onChangeTheme={theme => updateSettings({ theme })} />

          <ReaderFontFamilyControls
            fontFamily={fontFamily}
            onChangeFontFamily={fontFamily => updateSettings({ fontFamily })}
          />

          <ReaderFontSizeControls
            fontSize={fontSize}
            onChangeFontSize={fontSize => updateSettings({ fontSize })}
          />
        </View>
      )}
    </View>
  );
}
