import React from 'react';

import { images } from '@assets/image';
import { View } from '@rn-core';
import { Image, ImageStyle } from 'expo-image';

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
      <Image
        style={[styles.img, styleOverride as ImageStyle]}
        contentFit={resizeMode}
        source={images[source ?? 'default']}
      />
    </View>
  );
};
