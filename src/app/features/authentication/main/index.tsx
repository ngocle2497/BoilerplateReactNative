import React from 'react';
import {View} from 'react-native';
import {Wallpaper, Text, Screen, Button} from '../../../library/components';
import {GlobalStyle} from '../../../themes';
export const Main = (props: any) => {
  return (
    <View style={[GlobalStyle.fullScreen, {paddingTop: 50}]}>
      <Wallpaper />
      <Screen
        draw={true}
        statusColor={'transparent'}
        isScroll={true}
        backgroundColor={'transparent'}>
        <Text style={{color: 'blue'}}>demo</Text>
      </Screen>
    </View>
  );
};
