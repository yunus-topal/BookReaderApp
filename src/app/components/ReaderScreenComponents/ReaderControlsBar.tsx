// src/reader/ReaderControlsBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { spacing } from '@theme';
import { ReaderSettings } from '@app/types';

interface Props {
  settings: ReaderSettings;
  onSettingsChange: (next: Partial<ReaderSettings>) => void;
  progress: number;
}

export const ReaderControlsBar: React.FC<Props> = ({
  settings,
  onSettingsChange,
  progress,
}) => {
  
  return (
    <View style={styles.container}>

      {/* Center: progress */}
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>

      {/* Right: simple settings toggle placeholder */}
      <Button
        mode="text"
        onPress={() => {
          // Example toggle: paged <-> scroll
          onSettingsChange({
            layoutMode: settings.layoutMode === 'paged' ? 'scroll' : 'paged',
          });
        }}
      >
        {settings.layoutMode === 'paged' ? 'Scroll' : 'Paged'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontWeight: '600',
  },
});
