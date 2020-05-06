import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '@features/authentication/main/profile/screen';
import {APP_SCREEN} from '@navigation'
const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () =>{
    return(
        <ProfileStack.Navigator>
            <ProfileStack.Screen name={APP_SCREEN.AUTHORIZE.PROFILE_DRAWER.PROFILE} component={Profile}/>
        </ProfileStack.Navigator>
    )
}
