import React, { memo, useMemo } from 'react';
import { presets } from './Wallpaper.presets';
import { WallpaperProps } from './Wallpaper.props';
import equals from 'react-fast-compare';
import { enhance } from '@common';
import { Img } from '../Image/Image';
import { useWindowDimensions, StyleProp, ImageStyle } from 'react-native';

const WallpaperComponent = ({
  preset = 'stretch',
  style: styleOverride,
  backgroundImage = 'bg_wallpaper',
}: WallpaperProps) => {
  const { height, width } = useWindowDimensions()
  const presetToUse = presets[preset];
  const style = useMemo<StyleProp<ImageStyle>>(() => enhance([presetToUse, { width, height }, styleOverride]), [
    styleOverride, width, height
  ]);

  return (
    <Img
      containerStyle={presets[preset]}
      source={backgroundImage}
      style={style}
    />
  );
};
export const Wallpaper = memo(WallpaperComponent, equals
);
