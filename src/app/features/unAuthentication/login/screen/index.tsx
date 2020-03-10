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
export const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={[GlobalStyle.fullScreen]}>
      <Wallpaper />
      <Screen
        draw={true}
        isScroll={false}
        backgroundColor={'transparent'}
        forceInset={{ top: 'always' }}
        customInsetBottom={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onPress={() => {
              console.log("LOGGGG", "asdasdgaksdaksdsah")
              dispatch(onSetToken("token"))
            }}>
            <Text style={{ color: 'red' }}>Login</Text>
          </Button>
          <Button
            onPress={() => {
              navigation.push("REGISTER")
            }}>
            <Text style={{ color: 'red' }}>Register</Text>
          </Button>
        </View>
      </Screen>
    </View>
  );
};
