// src/components/ReaderControlBarComponents/ReaderThemeControls.tsx
import { READER_THEMES, ReaderTheme } from '@app/types';
import { View, Text, Pressable } from 'react-native';
import { createStyles } from '../ReaderControlsBarStyles';

const themeOptions = (Object.keys(READER_THEMES) as ReaderTheme[]).map(key => ({
  key,
  color: READER_THEMES[key].body.background,
}));

interface ThemeControlsRowProps {
  theme: ReaderTheme;
  onChangeTheme: (theme: ReaderTheme) => void;
}

export const ReaderThemeControls = ({ theme, onChangeTheme }: ThemeControlsRowProps) => {
  const styles = createStyles();
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Theme</Text>

      <View style={styles.circleRow}>
        {themeOptions.map(({ key, color }) => (
          <Pressable
            key={key}
            onPress={() => onChangeTheme(key)}
            style={[
              styles.circle,
              { backgroundColor: color },
              theme === key && styles.circleActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};
