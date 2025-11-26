// src/components/ReaderControlsBar.tsx
import { ReaderSettings } from '@app/types';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ReaderFontSizeControls } from './ReaderControlBarComponents/ReaderFontSizeControls';
import { ReaderThemeControls } from './ReaderControlBarComponents/ReaderThemeControls';
import { ReaderFontFamilyControls } from './ReaderControlBarComponents/ReaderFontFamilyControls';
import { createStyles } from './ReaderControlsBarStyles';
import { useAppTheme } from '@theme/ThemeProvider';

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

  const { theme } = useAppTheme();
  const palette = theme.appPalette;
  const { theme: readerTheme, fontFamily, fontSize } = settings;
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
          iconColor={palette.subtle}
        />
      </View>

      {expanded && (
        <View style={styles.content}>
          <ReaderThemeControls
            theme={readerTheme}
            onChangeTheme={theme => updateSettings({ theme })}
          />

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
