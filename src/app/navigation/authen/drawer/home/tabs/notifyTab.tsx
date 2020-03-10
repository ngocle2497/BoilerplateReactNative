import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Notify } from '../../../../../features/authentication/main/home/tab/'
import {APP_SCREEN} from '../../../../screenTypes'
const NotifyTabStack = createStackNavigator();

export const NotifyTabScreen = () =>{
    return <NotifyTabStack.Navigator>
        <NotifyTabStack.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.NOTIFY_TAB.NOTIFY} component={Notify}/>
    </NotifyTabStack.Navigator>
}
