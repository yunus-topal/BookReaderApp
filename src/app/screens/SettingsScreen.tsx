// src/screens/SettingsScreen.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, RadioButton, List, useTheme, Divider } from 'react-native-paper';
import { useAppTheme } from '@theme/ThemeProvider';
import type { AppThemeName } from '@theme/themes';

const THEME_OPTIONS: { key: AppThemeName; label: string; group: string }[] = [
  { key: 'indigoDark', label: 'Indigo (Dark)', group: 'Indigo' },
  { key: 'indigoLight', label: 'Indigo (Light)', group: 'Indigo' },
  { key: 'emeraldDark', label: 'Emerald (Dark)', group: 'Emerald' },
  { key: 'emeraldLight', label: 'Emerald (Light)', group: 'Emerald' },
  { key: 'sepiaDark', label: 'Sepia (Dark)', group: 'Sepia / Book' },
  { key: 'sepiaLight', label: 'Sepia (Light)', group: 'Sepia / Book' },
];

const SettingsScreen: React.FC = () => {
  const paperTheme = useTheme();
  const { themeName, setThemeName } = useAppTheme();

  const grouped = THEME_OPTIONS.reduce<Record<string, typeof THEME_OPTIONS>>(
    (acc, opt) => {
      if (!acc[opt.group]) acc[opt.group] = [];
      acc[opt.group].push(opt);
      return acc;
    },
    {}
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
      <View style={{ padding: 16 }}>
        <Text variant="titleMedium" style={{ marginBottom: 16 }}>
          Appearance
        </Text>

        <RadioButton.Group
          value={themeName}
          onValueChange={(value) => setThemeName(value as AppThemeName)}
        >
          {Object.entries(grouped).map(([group, options]) => (
            <View key={group} style={{ marginBottom: 8 }}>
              <Text
                variant="labelMedium"
                style={{ marginBottom: 4, opacity: 0.7 }}
              >
                {group}
              </Text>

              <View
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: paperTheme.colors.outline,
                }}
              >
                {options.map((opt, index) => (
                  <React.Fragment key={opt.key}>
                    {index > 0 && <Divider />}
                    <List.Item
                      title={opt.label}
                      onPress={() => setThemeName(opt.key)}
                      right={() => (
                        <RadioButton
                          value={opt.key}
                          status={themeName === opt.key ? 'checked' : 'unchecked'}
                          onPress={() => setThemeName(opt.key)}
                        />
                      )}
                    />
                  </React.Fragment>
                ))}
              </View>
            </View>
          ))}
        </RadioButton.Group>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
