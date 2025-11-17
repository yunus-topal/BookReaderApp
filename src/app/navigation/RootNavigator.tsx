// src/app/navigation/RootNavigator.tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import SettingsScreen from '@app/screens/SettingsScreen';
import VocabularyScreen from '@app/screens/VocabularyScreen';
import HomeStackNavigator from './HomeStackNavigator';

export type RootDrawerParamList = {
  Home: undefined;
  Settings: undefined;
  Vocabulary: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => {
          // Find which screen in HomeStack is focused (Landing or Reader)
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Landing';
          const isReader = routeName === 'Reader';

          return {
            // Show drawer header (with hamburger) only when NOT on Reader
            headerShown: !isReader,
            title: 'Library',
          };
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Vocabulary" component={VocabularyScreen} />
    </Drawer.Navigator>
  );
}
