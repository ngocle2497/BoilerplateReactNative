import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeBottomTabScreen } from './home/tabNavigator';
import { ProfileStackScreen } from './profile';
import { APP_SCREEN } from '../../screenTypes'
const MainDrawer = createDrawerNavigator();

export const MainDrawerScreen = () =>
    (
        <MainDrawer.Navigator screenOptions={{ gestureEnabled: true }} drawerType={'front'}>
            <MainDrawer.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.ROOT} component={HomeBottomTabScreen} />
            <MainDrawer.Screen name={APP_SCREEN.AUTHORIZE.PROFILE_DRAWER.ROOT} component={ProfileStackScreen} />
        </MainDrawer.Navigator>
    )

