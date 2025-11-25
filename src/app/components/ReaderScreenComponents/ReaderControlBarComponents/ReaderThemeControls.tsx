import { READER_THEMES, ReaderTheme } from "@app/types";
import { View, Text, Pressable, StyleSheet } from "react-native";

const themeOptions = (Object.keys(READER_THEMES) as ReaderTheme[]).map(key => ({
  key,
  color: READER_THEMES[key].body.background,
}));


interface ThemeControlsRowProps {
  theme: ReaderTheme;
  onChangeTheme: (theme: ReaderTheme) => void;
}

export const ReaderThemeControls = ({ theme, onChangeTheme }: ThemeControlsRowProps) => {
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


const styles = StyleSheet.create({
row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: '#9ca3af',
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

});