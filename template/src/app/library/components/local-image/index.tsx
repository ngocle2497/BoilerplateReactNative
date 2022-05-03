import React from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { images } from '@assets/image';

import { styles } from './styles';
import { LocalImageProps } from './type';

export const LocalImage = ({
  source,
  containerStyle,
  style: styleOverride,
  resizeMode = 'cover',
}: LocalImageProps) => {
  // render
  return (
    <View style={containerStyle}>
      <FastImage
        style={[styles.img, styleOverride]}
        resizeMode={resizeMode}
        source={images[source ?? 'default']}
      />
    </View>
  );
};
