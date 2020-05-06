import React from 'react';
import {View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Wallpaper, Text, Screen, Button} from '@components';
import { onRemoveToken } from '@app_redux/action';

export const Main = (props: any) => {
  const dispatch = useDispatch()
  return (
    <View style={{flex:1}}>
      <Wallpaper />
      <Screen
        draw
        statusColor={'transparent'}
        isScroll
        backgroundColor={'transparent'}>
        <Text onPress={()=>{dispatch(onRemoveToken())}} style={{color: 'blue'}}>Logout</Text>
      </Screen>
    </View>
  );
};
