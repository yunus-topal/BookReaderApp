// src/screens/ReaderScreen.tsx
import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ReaderPosition, ReaderSettings } from '@app/types';
import { useReaderSettings } from '@app/hooks/useReaderSettingsStore';
import { ReaderControlsBar } from '@app/components/ReaderScreenComponents/ReaderControlsBar';
import { ReaderView } from '@app/components/ReaderScreenComponents/ReaderView';
import { HomeStackParamList } from '@app/navigation/HomeStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native-paper';
import { useDocumentReadingState } from '@app/hooks/useDocumentReadingState';

type Props = NativeStackScreenProps<HomeStackParamList, 'Reader'>;

export const ReaderScreen: React.FC<Props> = ({ route, navigation }) => {
  const { document } = route.params;
  const { settings, updateSettings, isLoaded } = useReaderSettings();
  const { updatePosition, state } = useDocumentReadingState(document.id);


  const handleSettingsChange = useCallback(
    async (newSettings: Partial<ReaderSettings>) => {
      await updateSettings(newSettings);
    },
    [updateSettings]
  );

  const handlePositionChange = useCallback((pos: ReaderPosition) => {
    // Save last position to document meta
    updatePosition(pos);

  }, [document.id, updatePosition]);

  return (
    <View style={styles.container}>
      <Button>Test Button</Button>
      <ReaderView
        document={document}
        settings={settings}
        position={state?.position}
        onPositionChange={handlePositionChange}
      />
      
       <ReaderControlsBar
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onPrev={() => {}}
        onNext={() => {}}
        progress={state?.position.progressFraction || 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});