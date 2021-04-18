import React, {useMemo, memo} from 'react';
import {StyleProp} from 'react-native';
import {images} from '@assets/image';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import FastImage, {ImageStyle} from 'react-native-fast-image';

import {Block} from '../Block/Block';

import {ImageProps} from './Image.props';

const ImgComponent = (props: ImageProps) => {
  // state
  const {
    style: styleOverride = {},
    resizeMode = 'cover',
    source,
    containerStyle,
  } = props;

  // style
  const style: StyleProp<ImageStyle> = useMemo(() => enhance([styleOverride]), [
    styleOverride,
  ]);

  // render
  return (
    <Block style={containerStyle}>
      <FastImage
        style={style}
        resizeMode={resizeMode}
        source={images[source ?? 'default']}
      />
    </Block>
  );
};
export const Img = memo(ImgComponent, equals);
