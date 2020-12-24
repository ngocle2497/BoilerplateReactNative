import React, { memo, useMemo } from 'react';
import { ImageStyle, TouchableOpacity } from 'react-native';
import { IconProps } from './Icon.props';
import { icons } from '@assets/icon';
import { enhance } from '@common';
import equals from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
const SIZE = 24
const ROOT: ImageStyle = {
  resizeMode: 'cover',
};

const IconComponent = (props: IconProps) => {
  const { size = SIZE, icon, onPress, color } = props;
  const style: ImageStyle = useMemo<ImageStyle>(
    () => enhance([ROOT, { tintColor: color ?? undefined, width: size, height: size } as ImageStyle]),
    [size, color],
  );
  return (
    <TouchableOpacity disabled={typeof onPress !== 'function'} onPress={onPress}>
      <FastImage style={style} source={icons[icon ?? 'default']} />
    </TouchableOpacity>
  );
};
export const Icon = memo(IconComponent, equals);
