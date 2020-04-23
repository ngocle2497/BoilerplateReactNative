import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Image, FlatList, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Otp, Header, Checkbox, FAB, Block, Button, Divider, LightBox } from '../../../../library/components';
import { onSetToken, onSetAppTheme } from '../../../../store/app_redux/action';
import { navigate, APP_SCREEN } from '../../../../navigation';
import { onLogin } from '../redux/action';

export const Login = () => {
  const dispatch = useDispatch();
  const [dis, setDis] = useState(false)
  const [name, setName] = useState(true)
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
        forceInset={{ top: 'never' }}>
        <Block block justifyContent={'center'} middle>
          <Button onPress={() => dispatch(onSetToken('s'))}>
            <Text text={"LOGIN"} />
          </Button>
          <Button onPress={() => { navigate(APP_SCREEN.UN_AUTHORIZE.REGISTER) }}>
            <Text text={"REGISTER"} />
          </Button>
        </Block>
      </Screen>
    </View >
  );
};
