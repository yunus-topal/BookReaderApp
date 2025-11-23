// src/app/navigation/RootNavigatorStyles.ts
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { AppPalette } from '@theme/colors';
import { StyleProp, ViewStyle } from 'react-native';

export function createRootNavigatorScreenOptions(
  palette: AppPalette,
): DrawerNavigationOptions {
  return {
    headerStyle: {
      backgroundColor: palette.surface,
    },
    headerTintColor: palette.title,
    headerTitleStyle: {
      color: palette.title,
      fontWeight: '600',
    },

    drawerStyle: {
      backgroundColor: palette.background,
    },
    drawerActiveTintColor: palette.primary,
    drawerInactiveTintColor: palette.subtle,
    drawerActiveBackgroundColor: palette.surfaceSoft,
    drawerInactiveBackgroundColor: 'transparent',
    drawerLabelStyle: {
      fontWeight: '600',
    },
  };
}

export function createRootNavigatorSceneStyle(
  palette: AppPalette,
): StyleProp<ViewStyle> {
  return {
    backgroundColor: palette.background,
  };
}
