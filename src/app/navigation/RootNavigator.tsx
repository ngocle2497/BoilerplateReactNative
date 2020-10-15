import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainDrawerScreen } from './authen/drawer/index';
import { APP_SCREEN, RootStackParamList } from './screenTypes';
import { UnAuthentication } from './unAuthen/index';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = ({ token }: { token: any }) => (
  <RootStack.Navigator headerMode={'none'} screenOptions={{}}>
    {!token ? (
      <RootStack.Screen
        options={{ animationTypeForReplace: 'pop', gestureEnabled: false }}
        name={APP_SCREEN.UN_AUTHORIZE}
        component={UnAuthentication}
      />
    ) : (
        <RootStack.Screen
          options={{ gestureEnabled: false }}
          name={APP_SCREEN.AUTHORIZE}
          component={MainDrawerScreen}
        />
      )}
  </RootStack.Navigator>
);
