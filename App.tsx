import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@app/navigation/RootNavigator';
import { AppThemeProvider } from '@theme/ThemeProvider';
import { ReaderSettingsProvider } from '@app/components/ReaderScreenComponents/ReaderSettingsContext';

export default function App() {
  return (
    <AppThemeProvider>
      <ReaderSettingsProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <RootNavigator />
        </NavigationContainer>
      </ReaderSettingsProvider>
    </AppThemeProvider>
  );
}
