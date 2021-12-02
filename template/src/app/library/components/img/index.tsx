import {images} from '@assets/image';
import {enhance} from '@common';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {StyleProp, View} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';

import {ImageProps} from './type';

const ImgComponent = (props: ImageProps) => {
  // state
  const {
    style: styleOverride,
    resizeMode = 'cover',
    source,
    containerStyle,
  } = props;

  // style
  const style = useMemo<StyleProp<ImageStyle>>(
    () =>
      enhance([{width: '100%', height: '100%'}, styleOverride as ImageStyle]),
    [styleOverride],
  );

  // render
  return (
    <View style={containerStyle}>
      <FastImage
        style={style}
        resizeMode={resizeMode}
        source={images[source ?? 'default']}
      />
    </View>
  );
};
export const Img = memo(ImgComponent, equals);
