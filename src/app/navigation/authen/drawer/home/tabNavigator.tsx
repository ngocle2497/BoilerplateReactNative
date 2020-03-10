import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatTabScreen } from './tabs/chatTab';
import { NotifyTabScreen } from './tabs/notifyTab';
import {APP_SCREEN} from '../../../screenTypes'
const HomeBottomTab = createBottomTabNavigator();

export const HomeBottomTabScreen = () =>{
    return (
        <HomeBottomTab.Navigator>
            <HomeBottomTab.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.CHAT_TAB.ROOT} component={ChatTabScreen}/>
            <HomeBottomTab.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.NOTIFY_TAB.ROOT} component={NotifyTabScreen}/>
        </HomeBottomTab.Navigator>
    )
}
