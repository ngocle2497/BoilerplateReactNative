import React from 'react'
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import { HomeBottomTabScreen } from './home/TabNavigator';
import { ProfileStackScreen } from './profile';
import { APP_SCREEN } from '@navigation/screenTypes'
const MainDrawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
    gestureEnabled: false
}

export const MainDrawerScreen = () =>
    (
        <MainDrawer.Navigator screenOptions={screenOptions} drawerType={'front'}>
            <MainDrawer.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.ROOT} component={HomeBottomTabScreen} />
            <MainDrawer.Screen name={APP_SCREEN.AUTHORIZE.PROFILE_DRAWER.ROOT} component={ProfileStackScreen} />
        </MainDrawer.Navigator>
    )

