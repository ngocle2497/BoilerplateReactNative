import * as React from 'react';
import { Image, ImageStyle } from 'react-native';
import { IconProps } from './Icon.props';
import { icons } from '../../../assets/icon';
import { mergeAll, flatten, equals } from 'ramda';
import { Block } from '../Block/Block';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

const IconComponent = (props: IconProps) => {
  const { style: styleOverride = {}, icon, containerStyle } = props;
  const style: ImageStyle = mergeAll(flatten([ROOT, styleOverride]));
  return (
    <Block style={containerStyle}>
      <Image style={style} source={icons[icon ?? 'close']} />
    </Block>
  )
}
export const Icon = React.memo(IconComponent, (prevProps, nextProps) => equals(prevProps, nextProps))