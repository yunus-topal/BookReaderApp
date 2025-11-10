import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import RootNavigator from './src/app/navigation/RootNavigator';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0b0f14',
    card: '#111820',
    text: '#e6edf3',
    border: '#1f2a36',
    primary: '#4ea1ff',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
    </NavigationContainer>
  );
}
