import * as React from 'react';
import { Image, ImageStyle } from 'react-native';
import { ImageProps } from './Image.props';
import { images } from '@assets/image';
import { mergeAll, flatten, equals } from 'ramda';
import { Block } from '../Block/Block';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

const ImgComponent = (props: ImageProps) => {
  const { style: styleOverride = {}, source, containerStyle } = props;
  const style: ImageStyle = mergeAll(flatten([ROOT, styleOverride]));

  return (
    <Block style={containerStyle}>
      <Image style={style} source={images[source ?? 'default']} />
    </Block>
  )
}
export const Img = React.memo(ImgComponent, (prevProps, nextProps) => equals(prevProps, nextProps))