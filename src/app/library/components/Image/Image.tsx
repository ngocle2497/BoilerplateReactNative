import React, { useMemo, memo } from 'react';
import { ImageStyle } from 'react-native';
import { ImageProps } from './Image.props';
import { images } from '@assets/image';
import { enhance } from '@common';
import equals from 'react-fast-compare';
import { Block } from '../Block/Block';
import FastImage from 'react-native-fast-image';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

const ImgComponent = (props: ImageProps) => {
  const { style: styleOverride = {}, resizeMode = 'cover', source, containerStyle } = props;
  const style = useMemo(
    () => enhance([ROOT, styleOverride]),
    [styleOverride],
  );

  return (
    <Block style={containerStyle}>
      <FastImage style={style} resizeMode={resizeMode} source={images[source ?? 'default']} />
    </Block>
  );
};
export const Img = memo(ImgComponent, equals);
