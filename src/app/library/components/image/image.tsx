import * as React from 'react';
import { View, Image, ImageStyle } from 'react-native';
import { ImageProps } from './Image.props';
import { images } from '../../../assets/image';
import { mergeAll, flatten } from 'ramda';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

export const Img = (props: ImageProps) => {
  const { style: styleOverride, source, containerStyle, dependency = [] } = props;
  const style: ImageStyle = mergeAll(flatten([ROOT, styleOverride]));
  const dependencyList = [style, containerStyle, source, ...dependency]
  
  return React.useMemo(() => (
    <View style={containerStyle}>
      <Image style={style} source={images[source]} />
    </View>
  ), dependencyList)
}
