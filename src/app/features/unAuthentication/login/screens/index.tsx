import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../redux/action';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Button } from '../../../../library/components';
import { GlobalStyle } from '../../../../themes/index';
import { navigate } from '../../../../navigation/navigationService'
import { onSetToken } from '../../../../store/app_redux/action';
export const Login = (props: any) => {
  const dispatch = useDispatch()
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={[GlobalStyle.fullScreen]}>
      <Wallpaper />
      <Screen
        draw={true}
        isScroll={true}
        forceInset={{top:'always'}}
        customInsetBottom={false}>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => {
              console.log("LOGGGG","asdasdgaksdaksdsah")
              dispatch(onSetToken("token"))
            }}>
            <Text style={{ color: 'red' }}>Login</Text>
          </Button></View>
      </Screen>
    </View>
  );
};
