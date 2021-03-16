import React from 'react';
import {Home} from '@features/authentication/home';
import {APP_SCREEN} from '@navigation/screenTypes';
import {createStackNavigator} from '@react-navigation/stack';

const MainDrawer = createStackNavigator();

export const MainDrawerScreen = () => (
  <MainDrawer.Navigator>
    <MainDrawer.Screen name={APP_SCREEN.HOME} component={Home} />
  </MainDrawer.Navigator>
);
