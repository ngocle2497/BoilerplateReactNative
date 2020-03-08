import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Login } from '../../features/unAuthentication/login/screens/index'
import * as ScreenTypes from '../screenTypes'
const Stack = createStackNavigator();

export const UnAuthentication = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name={ScreenTypes.LOGIN} component={Login} />
        </Stack.Navigator>
    )
}

