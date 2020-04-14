import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UnAuthentication,APP_SCREEN, MainDrawerScreen } from './';

const RootStack = createStackNavigator();
export const RootNavigation = ({ token }: { token: any }) => (
    <RootStack.Navigator headerMode={'none'} screenOptions={{}}>
        {token === null ?
            <RootStack.Screen options={{ animationTypeForReplace: 'pop', gestureEnabled: false }} name={APP_SCREEN.UN_AUTHORIZE.ROOT} component={UnAuthentication} />
            : <RootStack.Screen options={{ gestureEnabled: false }} name={APP_SCREEN.AUTHORIZE.ROOT} component={MainDrawerScreen} />}
    </RootStack.Navigator>

)

