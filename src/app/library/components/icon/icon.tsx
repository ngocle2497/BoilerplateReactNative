import * as React from 'react';
import { View, Image, ImageStyle } from 'react-native';
import { IconProps } from './Icon.props';
import { icons } from '../../../assets/icon';
import { mergeAll, flatten } from 'ramda';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

export const Icon = (props: IconProps) => {
  const { style: styleOverride, icon, containerStyle, dependency = [] } = props;
  const style: ImageStyle = mergeAll(flatten([ROOT, styleOverride]));
  const dependencyList = [style, containerStyle, icon, ...dependency]
  return React.useMemo(() => (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  ), dependencyList)
}
