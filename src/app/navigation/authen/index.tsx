import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Main } from '../../features/authentication/main/index'
import * as ScreenTypes from '../screenTypes'
const Stack = createStackNavigator();

export const Authentication = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name={ScreenTypes.HOME} component={Main} />
        </Stack.Navigator>
    )
}

