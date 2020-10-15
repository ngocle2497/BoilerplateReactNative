import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { HomeBottomTabScreen } from './home/TabNavigator';
import { ProfileStackScreen } from './profile';
import { APP_SCREEN } from '@navigation/screenTypes';
const MainDrawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
  // gestureEnabled: false,
};

export const MainDrawerScreen = () => (
  <MainDrawer.Navigator screenOptions={screenOptions} drawerType={'front'}>
    <MainDrawer.Screen
      name={APP_SCREEN.HOME_DRAWER}
      component={HomeBottomTabScreen}
    />
    <MainDrawer.Screen
      name={APP_SCREEN.PROFILE_DRAWER}
      component={ProfileStackScreen}
    />
  </MainDrawer.Navigator>
);
