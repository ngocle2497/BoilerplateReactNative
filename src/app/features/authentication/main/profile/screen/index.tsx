import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import Splash from 'react-native-splash-screen';
import { Wallpaper, Text, Screen, Button } from '@components';
import { onLogout } from '@store/app_redux/action';
export const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Wallpaper />
      <Screen
        draw
        backgroundColor={'#ffffff'}
        forceInset={{ top: 'always' }}
        customInsetBottom={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>Profile</Text>
          <Button onPress={() => { dispatch(onLogout()) }}>
            <Text>Logout</Text>
          </Button>
        </View>
      </Screen>
    </View>
  );
};
