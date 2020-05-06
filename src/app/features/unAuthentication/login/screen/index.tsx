import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import { Wallpaper, Text, Screen, Button, Header, Block } from '@components';
import { onSetToken, onSetAppTheme } from '@app_redux/action';
import { navigate, APP_SCREEN } from '@navigation';


export const Login = () => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <Wallpaper />
      <Header headerText={'Login'} />
      <Screen
        draw
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
