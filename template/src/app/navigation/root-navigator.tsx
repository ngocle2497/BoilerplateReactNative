import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import { useStyles } from 'react-native-unistyles';

import { APP_SCREEN } from '@navigation/screen-types';
import { createStaticNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/authentication/home';
import { Login } from '@screens/un-authentication/login';
import { selectAppToken } from '@selectors/app';
import { useAppStore } from '@stores/app';

import { navigationRef } from './navigation-service';

const useAppLoggedIn = () => {
  return useAppStore(selectAppToken) !== undefined;
};

const useAppLoggedOut = () => {
  return !useAppLoggedIn();
};

const RootStack = createNativeStackNavigator({
  groups: {
    [APP_SCREEN.UN_AUTHORIZE]: {
      if: useAppLoggedIn,
      screens: {
        [APP_SCREEN.HOME]: Home,
      },
    },
    [APP_SCREEN.AUTHORIZE]: {
      if: useAppLoggedOut,
      screenOptions: {
        headerShown: false,
      },
      screens: {
        [APP_SCREEN.LOGIN]: {
          screen: Login,
        },
      },
    },
  },
  screenOptions: {
    freezeOnBlur: true,
    navigationBarColor: '#ffffff',
    statusBarTranslucent: true,
  },
});

const Navigation = createStaticNavigation(RootStack);

export const RootNavigation = () => {
  // state

  const { theme } = useStyles();

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  // render
  return (
    <Navigation
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.color.background,
        },
      }}
    />
  );
};
