import { ReaderSettings } from '@app/types';
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet } from 'react-native';

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

interface FontSizeControlsRowProps {
  fontSize: ReaderSettings['fontSize'];
  onChangeFontSize: (size: ReaderSettings['fontSize']) => void;
}

export const FontSizeControls = ({ fontSize, onChangeFontSize }: FontSizeControlsRowProps) => {
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
          minimumTrackTintColor="#e5e7eb"
          maximumTrackTintColor="#4b5563"
          thumbTintColor="#e5e7eb"
        />

        <Text style={styles.sliderLabelLarge}>A</Text>
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
    marginRight: 2, // bring closer to slider
    marginLeft: 48,
  },

  sliderLabelLarge: {
    fontSize: 18,
    color: '#e5e7eb',
    marginLeft: 2, // bring closer to slider
  },
});
