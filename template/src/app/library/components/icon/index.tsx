import React, { forwardRef, useMemo } from 'react';
import { Image, ImageProps, ImageStyle } from 'react-native';

import Animated, { AnimatedProps } from 'react-native-reanimated';

import { icons } from '@assets/icon';
import { useStyles } from '@theme';

import { IconProps } from './type';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SIZE = 24;

export const Icon = ({
  icon,
  colorTheme,
  size = SIZE,
  resizeMode = 'contain',
}: IconProps & Pick<ImageProps, 'resizeMode'>) => {
  // state
  const { theme } = useStyles();

  // style
  const style = useMemo<ImageStyle>(
    () => ({ width: size, height: size }),
    [size],
  );

  // render
  return (
    <Image
      style={style}
      tintColor={
        colorTheme && typeof theme.color[colorTheme] === 'string'
          ? (theme.color[colorTheme] as string)
          : undefined
      }
      resizeMode={resizeMode}
      source={icons[icon]}
    />
  );
};

export const AnimatedIcon = forwardRef<
  Image,
  AnimatedProps<ImageProps> & IconProps
>(
  (
    {
      icon,
      colorTheme,
      size = SIZE,
      resizeMode = 'contain',
      ...rest
    }: Partial<AnimatedProps<ImageProps>> & IconProps,
    ref,
  ) => {
    // state
    const { theme } = useStyles();

    // style
    const style = useMemo<ImageStyle>(
      () => ({ width: size, height: size }),
      [size],
    );

    // render
    return (
      <AnimatedImage
        ref={ref}
        style={style}
        tintColor={
          colorTheme && typeof theme.color[colorTheme] === 'string'
            ? (theme.color[colorTheme] as string)
            : undefined
        }
        resizeMode={resizeMode}
        source={icons[icon]}
        {...rest}
      />
    );
  },
);
