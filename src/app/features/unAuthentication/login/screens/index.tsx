import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {onLogin} from '../redux/action';
import {styles} from './style';
import {LoginState} from '../redux/type';
import Splash from 'react-native-splash-screen';
import {Wallpaper, Text, Screen, Button} from '../../../../library/components';
import {GlobalStyle} from '../../../../themes/index';
export const Login = (props: any) => {
  const dispatch = useDispatch();
  const {}: LoginState = useSelector((x: any) => x.LoginReducer);
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={[GlobalStyle.fullScreen, styles.paddingSafe]}>
      <Wallpaper />
      <Screen
        draw={true}
        statusColor={'transparent'}
        isScroll={true}
        backgroundColor={'transparent'}>
        <Button
          onPress={() => {
            props.navigation.navigate('HOME');
          }}>
          <Text style={{color: 'red'}}>demo</Text>
        </Button>
      </Screen>
    </View>
  );
};
