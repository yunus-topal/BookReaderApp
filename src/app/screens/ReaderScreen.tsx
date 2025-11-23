// src/screens/ReaderScreen.tsx
import React, { useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ReaderPosition } from '@app/types';
import { HomeStackParamList } from '@app/navigation/HomeStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDocumentReadingState } from '@app/hooks/useDocumentReadingState';
import { ReaderView } from '../components/ReaderScreenComponents/ReaderView';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<HomeStackParamList, 'Reader'>;

export const ReaderScreen: React.FC<Props> = ({ route, navigation }) => {
  const { document } = route.params;
  const { updatePosition, state, isLoading } = useDocumentReadingState(document.id);

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
    <SafeAreaView style={styles.container}>
      <ReaderView
        key={document.id}
        document={document}
        position={state.position}
        onUserNavigate={handleUserNavigate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // match your reader background
  },
});