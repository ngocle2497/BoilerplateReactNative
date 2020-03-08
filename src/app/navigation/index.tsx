import * as React from 'react';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UnAuthentication } from './unAuthen/index'
import { Authentication } from './authen/index'
import * as ScreenTypes from './screenTypes'
import { navigationRef } from './navigationService';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState } from '../store/app_redux/type';
const Stack = createStackNavigator();

export const AppContainer = () => {
  const { token }: AppState = useSelector((x: any) => x.app)
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={ScreenTypes.UN_AUTHORIZE} screenOptions={{ headerShown: false }}>
          {token === null ?
            <Stack.Screen options={{ animationTypeForReplace: 'pop', gestureEnabled: false }} name={ScreenTypes.UN_AUTHORIZE} component={UnAuthentication} /> :
            <Stack.Screen options={{ gestureEnabled: false }} name={ScreenTypes.AUTHORIZE} component={Authentication} />}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}