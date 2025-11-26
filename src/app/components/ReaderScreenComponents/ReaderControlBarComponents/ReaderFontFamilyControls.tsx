// src/components/ReaderControlBarComponents/ReaderFontFamilyControls.tsx
import { View, Text, Pressable } from 'react-native';
import { createStyles } from '../ReaderControlsBarStyles';
import { ReaderFontFamily } from '@app/types';

const FONT_OPTIONS: { key: ReaderFontFamily; previewFamily: string }[] = [
  { key: 'serif', previewFamily: 'serif' },
  { key: 'sans-serif', previewFamily: 'sans-serif' },
  { key: 'monospace', previewFamily: 'monospace' },
];

interface FontFamilyControlsRowProps {
  fontFamily: ReaderFontFamily;
  onChangeFontFamily: (fontFamily: ReaderFontFamily) => void;
}

export const ReaderFontFamilyControls = ({
  fontFamily,
  onChangeFontFamily,
}: FontFamilyControlsRowProps) => {
  const styles = createStyles();

  return (
    <View style={styles.row}>
      <Text style={styles.label}>Font</Text>
      <View style={styles.fontRow}>
        {FONT_OPTIONS.map(opt => (
          <Pressable
            key={opt.key}
            style={[
              styles.fontChip,
              fontFamily === opt.key && styles.fontChipActive,
            ]}
            onPress={() => onChangeFontFamily(opt.key)}
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
  );
};
