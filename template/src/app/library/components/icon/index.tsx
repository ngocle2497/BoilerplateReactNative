import React, { forwardRef, useMemo } from 'react';

import Animated, { AnimatedProps } from 'react-native-reanimated';

import { icons } from '@assets/icon';
import { useStyles } from '@theme';
import { Image, ImageProps, ImageStyle } from 'expo-image';

import { IconProps } from './type';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SIZE = 24;

export const Icon = ({
  icon,
  colorTheme,
  size = SIZE,
  contentFit = 'contain',
}: IconProps & Pick<ImageProps, 'contentFit'>) => {
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
      contentFit={contentFit}
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
      contentFit = 'contain',
      ...rest
    }: AnimatedProps<ImageProps> & IconProps,
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
        contentFit={contentFit}
        source={icons[icon]}
        {...rest}
      />
    );
  },
);
