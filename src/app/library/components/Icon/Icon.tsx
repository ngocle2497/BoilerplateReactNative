import * as React from 'react';
import {Image, ImageStyle} from 'react-native';
import {IconProps} from './Icon.props';
import {icons} from '@assets/icon';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import {Block} from '../Block/Block';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

const IconComponent = (props: IconProps) => {
  const {style: styleOverride = {}, icon, containerStyle} = props;
  const style: ImageStyle = React.useMemo(
    () => enhance([ROOT, styleOverride]),
    [styleOverride],
  );
  return (
    <Block style={containerStyle}>
      <Image style={style} source={icons[icon ?? 'close']} />
    </Block>
  );
};
export const Icon = React.memo(IconComponent, (prevProps, nextProps) =>
  equals(prevProps, nextProps),
);
