import React, { useMemo } from 'react';
import { StyleProp, TouchableOpacity } from 'react-native';

import FastImage, { ImageStyle } from 'react-native-fast-image';

import { icons } from '@assets/icon';
import { useTheme } from '@theme';

import { IconProps } from './type';

const SIZE = 24;

export const Icon = ({
  icon,
  color,
  colorTheme,
  onPress,
  size = SIZE,
  resizeMode = 'contain',
}: IconProps) => {
  // state

  const theme = useTheme();

  // style
  const style = useMemo<StyleProp<ImageStyle>>(
    () => [{ width: size, height: size }],
    [size],
  );

  // render
  return (
    <TouchableOpacity
      disabled={typeof onPress !== 'function'}
      onPress={onPress}>
      <FastImage
        style={style}
        tintColor={colorTheme ? theme.colors[colorTheme] : color}
        resizeMode={resizeMode}
        source={icons[icon]}
      />
    </TouchableOpacity>
  );
};
