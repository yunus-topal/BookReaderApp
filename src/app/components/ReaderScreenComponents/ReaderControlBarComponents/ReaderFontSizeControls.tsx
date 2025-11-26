// src/components/ReaderControlBarComponents/ReaderFontSizeControls.tsx
import { ReaderFontSize } from '@app/types';
import Slider from '@react-native-community/slider';
import { View, Text } from 'react-native';
import { createStyles } from '../ReaderControlsBarStyles';
import { useAppTheme } from '@theme/ThemeProvider';

const FONT_SIZE_KEYS: ReaderFontSize[] = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
];

const sliderValueFromFontSize = (size: ReaderFontSize) => {
  const idx = FONT_SIZE_KEYS.indexOf(size);
  return idx === -1 ? 2 : idx; // default to 'medium'
};

const fontSizeFromSliderValue = (value: number): ReaderFontSize => {
  const idx = Math.round(value);
  return FONT_SIZE_KEYS[idx] ?? 'medium';
};

interface FontSizeControlsRowProps {
  fontSize: ReaderFontSize;
  onChangeFontSize: (fontSize: ReaderFontSize) => void;
}

export const ReaderFontSizeControls = ({
  fontSize,
  onChangeFontSize,
}: FontSizeControlsRowProps) => {
  const styles = createStyles();
  const { theme } = useAppTheme();
  const palette = theme.appPalette;

  return (
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
              onChangeFontSize(next);
            }
          }}
          minimumTrackTintColor={palette.primarySoft}
          maximumTrackTintColor={palette.border}
          thumbTintColor={palette.primary}
        />

        <Text style={styles.sliderLabelLarge}>A</Text>
      </View>
    </View>
  );
};
