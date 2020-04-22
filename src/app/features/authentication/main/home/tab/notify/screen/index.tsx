import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Button } from '../../../../../../../library/components';
import I18n from '../../../../../../../library/utils/i18n/i18n';
export const Notify = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={{flex:1}}>
      <Wallpaper />
      <Screen
        draw={true}
        isScroll={false}
        backgroundColor={'#ffffff'}
        forceInset={{ top: 'always' }}
        customInsetBottom={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }} tx={'main:profileTab:tvProfile'}/>
        </View>
      </Screen>
    </View>
  );
};
