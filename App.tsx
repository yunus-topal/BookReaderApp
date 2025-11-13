import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@app/navigation/RootNavigator';
import { AppThemeProvider } from '@theme/ThemeProvider';

export default function App() {
  return (
    <AppThemeProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
      </NavigationContainer>
    </AppThemeProvider>
  );
}