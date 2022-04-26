import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

import { createStackNavigator } from '@react-navigation/stack';

import { MainScreen } from './authen/index';
import { APP_SCREEN, RootStackParamList } from './screen-types';
import { UnAuthentication } from './un-authen/index';

import { useSelector } from '../common/hooks';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state
  const token = useSelector(x => x.app.token);
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
        <RootStack.Screen
          options={{ animationTypeForReplace: 'pop', gestureEnabled: false }}
          name={APP_SCREEN.UN_AUTHORIZE}
          component={UnAuthentication}
        />
      ) : (
        <RootStack.Screen
          options={{ gestureEnabled: false }}
          name={APP_SCREEN.AUTHORIZE}
          component={MainScreen}
        />
      )}
    </RootStack.Navigator>
  );
};
