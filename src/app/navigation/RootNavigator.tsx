// src/app/navigation/RootNavigator.tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import SettingsScreen from '@app/screens/SettingsScreen';
import VocabularyScreen from '@app/screens/VocabularyScreen';
import HomeStackNavigator from './HomeStackNavigator';
import { useAppTheme } from '@theme/ThemeProvider';
import { createRootNavigatorScreenOptions } from './RootNavigatorStyles';

export type RootDrawerParamList = {
  Home: undefined;
  Settings: undefined;
  Vocabulary: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootNavigator() {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;

  const screenOptions = createRootNavigatorScreenOptions(palette);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Landing';
          const isReader = routeName === 'Reader';

          return {
            headerShown: !isReader,
            title: 'Library',
          };
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      {/* <Drawer.Screen name="Vocabulary" component={VocabularyScreen} /> */}
    </Drawer.Navigator>
  );
}