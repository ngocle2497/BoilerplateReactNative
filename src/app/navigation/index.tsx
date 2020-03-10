import * as React from 'react';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './navigationService';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState } from '../store/app_redux/type';
import { RootNavigation } from './rootNavigation'
const Stack = createStackNavigator();
export const AppContainer = () => {
  const { token }: AppState = useSelector((x: any) => x.app)
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigation token={token} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}