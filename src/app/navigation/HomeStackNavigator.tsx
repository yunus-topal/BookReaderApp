// src/app/navigation/HomeStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '@app/screens/LandingScreen';
import { ReaderScreen } from '@app/screens/ReaderScreen';
import { DocumentMeta } from '@app/types';

export type HomeStackParamList = {
  Landing: undefined;
  Reader: { document: DocumentMeta };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Reader" component={ReaderScreen} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
