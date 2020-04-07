import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Button, Header, Otp } from '../../../../library/components';
import { onSetToken, onSetAppTheme } from '../../../../store/app_redux/action';
import AsyncStorage from '@react-native-community/async-storage';
import { APP_THEME } from '../../../../config';
export const Login = () => {
  const [otp, setotp] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Wallpaper />
      <Header headerText={'Login'} />
      <Screen
        draw={true}
        isScroll={false}
        backgroundColor={'transparent'}
        forceInset={{ top: 'always' }}
        customInsetBottom={false}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Otp textEntry={'*'} keyboardType={'numeric'} length={6} defaultOtp={otp} />
          <Button
            onPress={() => {
              dispatch(onSetToken('s'))
            }}>
            <Text>Login</Text>
          </Button>
          <Button onPress={() => {
            dispatch(onSetAppTheme('default'))
          }}>
            <Text style={styles().text}>Register</Text>
          </Button>
        </View>
      </Screen>
    </View>
  );
};
