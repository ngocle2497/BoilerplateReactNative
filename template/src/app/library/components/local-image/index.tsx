import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';

import { images } from '@assets/image';
import { View } from '@rn-core';

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
        resizeMode={resizeMode}
        source={images[source ?? 'default']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%',
  },
});
