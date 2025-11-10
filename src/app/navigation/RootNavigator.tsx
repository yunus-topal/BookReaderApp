import LandingScreen from '@app/screens/LandingScreen';
import SettingsScreen from '@app/screens/SettingsScreen';
import VocabularyScreen from '@app/screens/VocabularyScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

export type RootDrawerParamList = {
  Home: undefined;
  Settings: undefined;
  Vocabulary: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={LandingScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Vocabulary" component={VocabularyScreen} />
    </Drawer.Navigator>
  );
}
