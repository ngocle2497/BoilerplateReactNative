import React, {memo, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import SplashScreen from 'react-native-splash-screen';

import {MainScreen} from './authen/index';
import {APP_SCREEN, RootStackParamList} from './screenTypes';
import {UnAuthentication} from './unAuthen/index';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = memo(({token}: {token?: string}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <RootStack.Navigator headerMode={'none'} screenOptions={{}}>
      {!token ? (
        <RootStack.Screen
          options={{animationTypeForReplace: 'pop', gestureEnabled: false}}
          name={APP_SCREEN.UN_AUTHORIZE}
          component={UnAuthentication}
        />
      ) : (
        <RootStack.Screen
          options={{gestureEnabled: false}}
          name={APP_SCREEN.AUTHORIZE}
          component={MainScreen}
        />
      )}
    </RootStack.Navigator>
  );
}, isEqual);
