import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

import { useSelector } from '@hooks';
import { MainScreen } from '@navigation/authen/index';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { UnAuthentication } from '@navigation/un-authen/index';
import { createStackNavigator } from '@react-navigation/stack';

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
