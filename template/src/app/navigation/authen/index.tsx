import React, {memo} from 'react';
import {Home} from '@features/authentication/home';
import {APP_SCREEN} from '@navigation/screenTypes';
import {createStackNavigator} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';

const Main = createStackNavigator();

const MainScreenComponent = () => (
  <Main.Navigator>
    <Main.Screen name={APP_SCREEN.HOME} component={Home} />
  </Main.Navigator>
);
export const MainScreen = memo(MainScreenComponent, isEqual);
