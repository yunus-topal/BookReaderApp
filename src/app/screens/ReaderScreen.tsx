// src/screens/ReaderScreen.tsx
import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ReaderPosition, ReaderSettings } from '@app/types';
import { useReaderSettings } from '@app/hooks/useReaderSettingsStore';
import { ReaderControlsBar } from '@app/components/ReaderScreenComponents/ReaderControlsBar';
import { HomeStackParamList } from '@app/navigation/HomeStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDocumentReadingState } from '@app/hooks/useDocumentReadingState';
import { ReaderView, ReaderViewHandle } from '../components/ReaderScreenComponents/ReaderView';

type Props = NativeStackScreenProps<HomeStackParamList, 'Reader'>;

export const ReaderScreen: React.FC<Props> = ({ route, navigation }) => {
  const { document } = route.params;
  const { settings, updateSettings } = useReaderSettings();
  const { updatePosition, state } = useDocumentReadingState(document.id);
  const readerRef = useRef<ReaderViewHandle | null>(null);
  const [isBookReady, setIsBookReady] = useState(false);


  const handleSettingsChange = useCallback(
    async (newSettings: Partial<ReaderSettings>) => {
      await updateSettings(newSettings);
    },
    [updateSettings],
  );

  const handlePositionChange = useCallback(
    (pos: ReaderPosition) => {
      // Save last position to document meta
      updatePosition(pos);
    },
    [updatePosition],
  );

  return (
    <View style={styles.container}>
      <ReaderView
        ref={readerRef}
        document={document}
        settings={settings}
        position={state?.position}
        onPositionChange={handlePositionChange}
        onReadyChange={setIsBookReady}
      />

      {isBookReady && (
        <ReaderControlsBar
          settings={settings}
          onSettingsChange={handleSettingsChange}
          progress={state?.position.progressFraction || 0}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
