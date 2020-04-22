import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Button, } from '../../../../../../../../../library/components';
import I18n from '../../../../../../../../../library/utils/i18n/i18n';
import { navigate, APP_SCREEN } from '../../../../../../../../../navigation';

export const Chat = () => {
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Wallpaper />
      <Screen
        draw={true}
        isScroll={false}
        backgroundColor={'#ffffff'}
        forceInset={{ top: 'always' }}
        customInsetBottom={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>Chat</Text>
          <Button onPress={() => {
            navigate(APP_SCREEN.AUTHORIZE.HOME_DRAWER.CHAT_TAB.DETAIL_CHAT)
          }}>
            <Text text={'Detail'} />
          </Button>
        </View>
      </Screen>
    </View>
  );
};
