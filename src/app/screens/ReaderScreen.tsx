// src/screens/ReaderScreen.tsx
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ReaderPosition, ReaderSettings } from '@app/types';
import { useReaderSettings } from '@app/hooks/useReaderSettingsStore';
import { ReaderControlsBar } from '@app/components/ReaderScreenComponents/ReaderControlsBar';
import { HomeStackParamList } from '@app/navigation/HomeStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDocumentReadingState } from '@app/hooks/useDocumentReadingState';
import { ReaderView } from '../components/ReaderScreenComponents/ReaderView';

type Props = NativeStackScreenProps<HomeStackParamList, 'Reader'>;

export const ReaderScreen: React.FC<Props> = ({ route, navigation }) => {
  const { document } = route.params;
  const { settings, updateSettings } = useReaderSettings();
  const { updatePosition, state, isLoading } = useDocumentReadingState(document.id);
  const [isBookReady, setIsBookReady] = useState(false);


  const handleSettingsChange = useCallback(
    async (newSettings: Partial<ReaderSettings>) => {
      await updateSettings(newSettings);
    },
    [updateSettings],
  );

  const handleUserNavigate = useCallback(
    (pos: ReaderPosition) => {
      // Persist only on user navigation (swipe, buttons, etc.)
      updatePosition(pos);
    },
    [updatePosition],
  );

  if (isLoading || !state) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  //console.log('Rendering ReaderScreen with position:', state);

  return (
    <View style={styles.container}>
      <ReaderView
        key={document.id}
        document={document}
        settings={settings}
        position={state.position}
        onUserNavigate={handleUserNavigate}
        onReadyChange={setIsBookReady}
      />

      {/* {isBookReady && (
        <ReaderControlsBar
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onUserNavigate={handleUserNavigate}
          progress={state?.position?.progressFraction || 0}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
