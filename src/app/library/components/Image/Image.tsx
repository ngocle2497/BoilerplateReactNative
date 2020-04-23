import * as React from 'react';
import { Image, ImageStyle } from 'react-native';
import { ImageProps } from './Image.props';
import { images } from '../../../assets/image';
import { mergeAll, flatten } from 'ramda';
import { Block } from '../Block/Block';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

export const Img = (props: ImageProps) => {
  const { style: styleOverride = {}, source, containerStyle, dependency = [] } = props;
  const style: ImageStyle = mergeAll(flatten([ROOT, styleOverride]));
  const dependencyList = [style, containerStyle, source, ...dependency]

  return React.useMemo(() => (
    <Block style={containerStyle}>
      <Image style={style} source={images[source ?? 'default']} />
    </Block>
  ), dependencyList)
}
