import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Image, FlatList, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Button, Header, FAB,SizeBox } from '../../../../library/components';
import { onSetToken, onSetAppTheme } from '../../../../store/app_redux/action';
import { navigate, APP_SCREEN } from '../../../../navigation';
import { onLogin } from '../redux/action';

export const Login = () => {
  const dispatch = useDispatch();
  const [dis, setDis] = useState(false)
  const [value, setValue] = useState(false)
  const [progress, setProgress] = useState(10)
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
        forceInset={{ top: 'never' }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        </View>
      </Screen>
      <FAB type={'group'}/>
    </View >
  );
};
