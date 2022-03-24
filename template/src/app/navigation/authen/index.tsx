import React from 'react';

import { Home } from '@features/authentication/home';
import { APP_SCREEN } from '@navigation/screen-types';
import { createStackNavigator } from '@react-navigation/stack';

const Main = createStackNavigator();

export const MainScreen = () => (
  <Main.Navigator>
    <Main.Screen name={APP_SCREEN.HOME} component={Home} />
  </Main.Navigator>
);
