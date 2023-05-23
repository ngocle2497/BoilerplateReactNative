import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import { useSelector } from 'react-redux';

import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { selectAppToken } from '@redux-selector/app';
import { Home } from '@screens/authentication/home';
import { Login } from '@screens/un-authentication/login';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state
  const token = useSelector(selectAppToken);

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  // render
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token === undefined ? (
        <RootStack.Group
          screenOptions={{
            freezeOnBlur: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <RootStack.Screen name={APP_SCREEN.LOGIN} component={Login} />
        </RootStack.Group>
      ) : (
        <RootStack.Group>
          <RootStack.Screen name={APP_SCREEN.HOME} component={Home} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
