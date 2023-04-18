import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { icons } from '@assets/icon';
import { useTheme } from '@theme';
import { Image, ImageStyle } from 'expo-image';

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
  const style = useMemo<ImageStyle>(
    () => ({ width: size, height: size }),
    [size],
  );

  // render
  return (
    <TouchableOpacity
      disabled={typeof onPress !== 'function'}
      onPress={onPress}>
      <Image
        style={style}
        tintColor={colorTheme ? theme.colors[colorTheme] : color}
        contentFit={resizeMode}
        source={icons[icon]}
      />
    </TouchableOpacity>
  );
};
