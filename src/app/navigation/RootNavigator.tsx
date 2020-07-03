import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainDrawerScreen } from './authen/drawer/index';
import { APP_SCREEN } from './screenTypes';
import { UnAuthentication } from './unAuthen/index';

const RootStack = createStackNavigator();
export const RootNavigation = ({ token }: { token: any }) => (
  <RootStack.Navigator headerMode={'none'} screenOptions={{}}>
    {!token ? (
      <RootStack.Screen
        options={{ animationTypeForReplace: 'pop', gestureEnabled: false }}
        name={APP_SCREEN.UN_AUTHORIZE.ROOT}
        component={UnAuthentication}
      />
    ) : (
        <RootStack.Screen
          options={{ gestureEnabled: false }}
          name={APP_SCREEN.AUTHORIZE.ROOT}
          component={MainDrawerScreen}
        />
      )}
  </RootStack.Navigator>
);
