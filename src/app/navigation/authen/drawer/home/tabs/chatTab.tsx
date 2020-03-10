import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators,TransitionSpecs,CardStyleInterpolators } from '@react-navigation/stack';
import { Chat, DetailChat } from '../../../../../features/authentication/main/home/tab/'
import {APP_SCREEN} from '../../../../screenTypes'
const ChatTabStack = createStackNavigator();

export const ChatTabScreen = ({ navigation, route }) => {
    if (route.state) {
        navigation.setOptions({
            tabBarVisible: route.state.index <= 0,
        })
    }
    return <ChatTabStack.Navigator screenOptions={{ gestureEnabled: true,
     headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
      headerTitleAlign: 'center', 
      headerBackTitleVisible: true,
      cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      }} headerMode={'float'}>
        <ChatTabStack.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.CHAT_TAB.CHAT} component={Chat} options={{ title: 'Chat'}} />
        <ChatTabStack.Screen name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.CHAT_TAB.DETAIL_CHAT} component={DetailChat}/>
    </ChatTabStack.Navigator>
}
