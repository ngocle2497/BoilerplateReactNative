import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { icons } from '@assets/icon';
import { useStyles } from '@theme';
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

  const { theme } = useStyles();

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
        tintColor={
          colorTheme && typeof theme.color[colorTheme] === 'string'
            ? (theme.color[colorTheme] as string)
            : color
        }
        contentFit={resizeMode}
        source={icons[icon]}
      />
    </TouchableOpacity>
  );
};
