// src/screens/ReaderScreen.tsx
import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ReaderPosition, ReaderSettings } from '@app/types';
import { useReaderSettings } from '@app/hooks/useReaderSettingsStore';
import { ReaderControlsBar } from '@app/components/ReaderScreenComponents/ReaderControlsBar';
import { ReaderView } from '@app/components/ReaderScreenComponents/ReaderView';
import { HomeStackParamList } from '@app/navigation/HomeStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'Reader'>;

export const ReaderScreen: React.FC<Props> = ({ route, navigation }) => {
  const { document } = route.params;
  const { settings, updateSettings, isLoaded } = useReaderSettings();
  //const { updateDocumentMeta } = useDocumentsStore();


  // const [position, setPosition] = useState<ReaderPosition>({
  //   location: null,
  //   progressFraction: document.lastPosition ?? 0,
  // });

  const handleSettingsChange = useCallback(
    async (newSettings: Partial<ReaderSettings>) => {
      await updateSettings(newSettings);
    },
    [updateSettings]
  );

  // const handlePositionChange = useCallback((pos: ReaderPosition) => {
  //   setPosition(pos);
  //   // Save last position to document meta
  //   updateDocumentMeta(document.id, { lastPosition: pos.progressFraction });
  // }, [document.id, updateDocumentMeta]);

  return (
    <View style={styles.container}>
      {/* <ReaderView
        document={document}
        settings={settings}
        position={position}
        onPositionChange={handlePositionChange}
      />

      <ReaderControlsBar
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onPrev={() => {}}
        onNext={() => {}}
        progress={position.progressFraction}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});