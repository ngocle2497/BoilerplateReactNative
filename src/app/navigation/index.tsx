import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './navigationService';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState } from '../store/app_redux/type';
import { RootNavigation } from './rootNavigation'
import { MyAppTheme } from '../themes/index'
import AsyncStorage from '@react-native-community/async-storage';
import { APP_THEME } from '../config';
import { onSetAppTheme } from '../store/app_redux/action';
const Stack = createStackNavigator();
export const AppContainer = () => {
  const { token, theme }: AppState = useSelector((x: any) => x.app)
  const [loading, setLoading] = React.useState(true)
  const dispatch = useDispatch();
  const onLoadTheme = async () => {
    await AsyncStorage.getItem(APP_THEME).then(val => {
      if (val && MyAppTheme[val]) {
        dispatch(onSetAppTheme(val))
      }
      setLoading(false)
    }).catch(er => {
      setLoading(false)
    })
  }
  React.useEffect(() => {
    onLoadTheme()
  }, [])
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyAppTheme[theme]} ref={navigationRef}>
        {loading === false ? <RootNavigation token={token} /> : null}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}