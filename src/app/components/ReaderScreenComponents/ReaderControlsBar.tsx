// src/reader/ReaderControlsBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { spacing } from '@theme';
import { locationToReaderPosition, ReaderPosition, ReaderSettings } from '@app/types';
import { useReader } from '@epubjs-react-native/core';

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
    const { goNext, goPrevious } = useReader();
  
  return (
    <View style={styles.container}>
      {/* Left: page buttons (if enabled) */}
      {['buttons', 'swipeAndButtons', 'all'].includes(settings.pageTurnControl) && (
        <View style={styles.navButtons}>
          <IconButton icon="chevron-left" size={28} onPress={goPrevious} />
          <IconButton icon="chevron-right" size={28} onPress={goNext} />
        </View>
      )}

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
