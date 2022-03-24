import React, { memo } from 'react';
import { View } from 'react-native';

import equals from 'react-fast-compare';
import FastImage from 'react-native-fast-image';

import { images } from '@assets/image';

import { styles } from './styles';
import { ImageProps } from './type';

const ImgComponent = ({
  style: styleOverride,
  resizeMode = 'cover',
  source,
  containerStyle,
}: ImageProps) => {
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
export const Img = memo(ImgComponent, equals);
