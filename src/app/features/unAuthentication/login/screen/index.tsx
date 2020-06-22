import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import { Wallpaper, Screen, ModalAppMode, ModalAppModeRef, Block, Text, Button } from '@components';
import { onSetToken } from '@store/app_redux/action';
import { navigate } from '@navigation/navigationService';
import { APP_SCREEN } from '@navigation/screenTypes';

export const Login = () => {
  const dispatch = useDispatch();
  const _modalMode = useRef<ModalAppModeRef>()
  return (
    <View style={{ flex: 1 }}>
      <Wallpaper />
      <ModalAppMode ref={_modalMode} />
      <Screen backgroundColor={'transparent'}>
        <Block block>
          <Button
            onPress={() => {
              dispatch(onSetToken('ss'));
            }}>
            <Text text={'Login'} />
          </Button>
          <Button
            onPress={() => {
              navigate(APP_SCREEN.UN_AUTHORIZE.REGISTER);
            }}>
            <Text text={'Register'} />
          </Button>
        </Block>
      </Screen>
    </View>
  );
};
