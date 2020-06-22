import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import Splash from 'react-native-splash-screen';
import {Wallpaper, Text, Screen} from '@components';
export const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Wallpaper />
      <Screen
        draw
        backgroundColor={'#ffffff'}
        forceInset={{top: 'always'}}
        customInsetBottom={false}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'red'}}>Profile</Text>
        </View>
      </Screen>
    </View>
  );
};
