import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Button, Header } from '../../../../library/components';
import { onSetToken, onSetAppTheme } from '../../../../store/app_redux/action';
import { navigate, APP_SCREEN } from '../../../../navigation';

export const Login = () => {
const dispatch = useDispatch();
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
        backgroundColor={'#FFFFFF'}
        forceInset={{ top: 'always' }}
        customInsetBottom={false}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onPress={() => {
              dispatch(onSetToken('12'))
            }}>
            <Text>Login</Text>
          </Button>
          <Button onPress={() => {
            navigate(APP_SCREEN.UN_AUTHORIZE.REGISTER)
          }}>
            <Text style={styles().text}>Register</Text>
          </Button>
        </View>
      </Screen>
    </View>
  );
};
