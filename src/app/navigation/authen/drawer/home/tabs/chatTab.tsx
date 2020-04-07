import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators, TransitionPresets, CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
import { Chat, DetailChat } from '../../../../../features/authentication/main/home/tab/'
import { APP_SCREEN } from '../../../../screenTypes'
const ChatTabStack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
    gestureEnabled: true,
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    ...TransitionPresets.SlideFromRightIOS
}

export const ChatTabScreen = ({ navigation, route }) => {
    if (route.state) {
        navigation.setOptions({
            tabBarVisible: route.state.index <= 0,
        })
    }
    return <ChatTabStack.Navigator screenOptions={screenOptions} headerMode={'screen'}>
        <ChatTabStack.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.CHAT_TAB.CHAT} component={Chat} options={{ title: 'Chat' }} />
        <ChatTabStack.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.CHAT_TAB.DETAIL_CHAT} component={DetailChat} />
    </ChatTabStack.Navigator>
}
