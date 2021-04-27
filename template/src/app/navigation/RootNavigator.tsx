import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import {MainScreen} from './authen/index';
import {APP_SCREEN, RootStackParamList} from './screenTypes';
import {UnAuthentication} from './unAuthen/index';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = ({token}: {token?: string}) => {
  // effect
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // render
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
};
