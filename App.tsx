import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@app/navigation/RootNavigator';
import { AppThemeProvider } from '@theme/ThemeProvider';
import { ReaderSettingsProvider } from '@app/components/ReaderScreenComponents/ReaderSettingsContext';
import { ReaderProvider } from '@epubjs-react-native/core';

export default function App() {
  return (
    <AppThemeProvider>
      <ReaderSettingsProvider>
        <ReaderProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <RootNavigator />
          </NavigationContainer>
        </ReaderProvider>
      </ReaderSettingsProvider>
    </AppThemeProvider>
  );
}
