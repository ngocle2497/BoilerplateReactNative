import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../redux/action';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Button, Switch, Checkbox, FormRow, Icon, Header, TextField } from '../../../../library/components';
import { onSetToken, onSetAppTheme } from '../../../../store/app_redux/action';
import AsyncStorage from '@react-native-community/async-storage';
import { APP_THEME } from '../../../../config';
export const Login = ({ navigation }) => {
  const [value, setValue] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Wallpaper />
      <Header leftIcon={'back'} headerText={'asdas'} style={{ backgroundColor: 'red' }} />
      <Screen
        draw={true}
        isScroll={false}
        backgroundColor={'transparent'}
        forceInset={{ top: 'always' }}
        customInsetBottom={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onPress={async () => {
              await AsyncStorage.setItem(APP_THEME, 'light')
              console.log("LOGGGG", "asdasdgaksdaksdsah")
              dispatch(onSetAppTheme('light'))
            }}>
            <Text>Login</Text>
          </Button>
          <Button
            onPress={async () => {
              await AsyncStorage.setItem(APP_THEME, 'default')
              dispatch(onSetAppTheme('default'))
            }}>
            <Text style={styles().text}>Register</Text>
          </Button>
        </View>
      </Screen>
    </View>
  );
};
