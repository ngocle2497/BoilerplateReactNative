import React, {useRef} from 'react';
import {View} from 'react-native';
import {Wallpaper, Screen, ModalAppMode, ModalAppModeRef} from '@components';
import {onSetToken, onSetAppMode} from '@store/app_redux/action';
import {FormLogin} from './components';
import {useDispatch} from '@common';

export const Login = () => {
  const dispatch = useDispatch();
  const _modalMode = useRef<ModalAppModeRef>();
  const _onSubmit = (data: any) => {
    dispatch(onSetAppMode('staging'));
    dispatch(onSetToken('s'));
  };
  return (
    <View style={{flex: 1}}>
      <Wallpaper />
      <ModalAppMode ref={_modalMode} />
      <Screen scroll backgroundColor={'transparent'}>
        <FormLogin onSubmit={_onSubmit} />
      </Screen>
    </View>
  );
};
