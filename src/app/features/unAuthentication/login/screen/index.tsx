import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import {
  Wallpaper,
  Screen,
  ModalAppMode,
  ModalAppModeRef,
  Block,
  Text,
  Button,
  AnimProcess,
} from '@components';
import { onSetToken, onSetAppMode } from '@store/app_redux/action';
import { navigate } from '@navigation/navigationService';
import { APP_SCREEN } from '@navigation/screenTypes';
import { FormLogin } from './components';

export const Login = () => {
  const dispatch = useDispatch();
  const _modalMode = useRef<ModalAppModeRef>();
  const _onSubmit = (data: any) => {
    dispatch(onSetAppMode('staging'))
    dispatch(onSetToken('s'))
  }
  return (
    <View style={{ flex: 1 }}>
      <Wallpaper />
      <ModalAppMode ref={_modalMode} />
      <Screen scroll backgroundColor={'transparent'}>
        <FormLogin onSubmit={_onSubmit} />
      </Screen>
    </View>
  );
};
