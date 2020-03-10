import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {APP_SCREEN} from './screenTypes'
import { Authentication } from './authen/index';
import { UnAuthentication } from './unAuthen/index';
import { MainDrawerScreen } from './authen/drawer';

const RootStack = createStackNavigator();
export const RootNavigation = ({ token }: { token: any }) => (
    <RootStack.Navigator headerMode={'none'} screenOptions={{}}>
        {token === null ?
            <RootStack.Screen options={{ animationTypeForReplace: 'pop', gestureEnabled: false }} name={APP_SCREEN.UN_AUTHORIZE.ROOT} component={UnAuthentication} />
            : <RootStack.Screen options={{ gestureEnabled: false }} name={APP_SCREEN.AUTHORIZE.ROOT} component={MainDrawerScreen} />}
    </RootStack.Navigator>

)

