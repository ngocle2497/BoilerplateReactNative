import React, { memo } from 'react';
import { View } from 'react-native';

import equals from 'react-fast-compare';
import FastImage from 'react-native-fast-image';

import { images } from '@assets/image';

import { styles } from './styles';
import { LocalImageProps } from './type';

const LocalImageComponent = ({
  style: styleOverride,
  resizeMode = 'cover',
  source,
  containerStyle,
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
export const LocalImage = memo(LocalImageComponent, equals);
