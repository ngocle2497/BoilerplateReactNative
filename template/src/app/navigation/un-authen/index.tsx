import React, { useEffect } from 'react';

import { AppModule } from '@common';
import { Login } from '@features/un-authentication/login';
import { Register } from '@features/un-authentication/register';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const UnAuthentication = () => {
  // effect
  useEffect(() => {
    // clean cache when logout
    AppModule.clearCache();
  }, []);

  // render
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name={APP_SCREEN.LOGIN} component={Login} />
      <Stack.Screen
        name={APP_SCREEN.REGISTER}
        component={Register}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
    </Stack.Navigator>
  );
};
