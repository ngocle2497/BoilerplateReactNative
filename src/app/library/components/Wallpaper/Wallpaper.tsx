import React, { memo, useMemo } from 'react';
import { Image } from 'react-native';
import { presets } from './Wallpaper.presets';
import { WallpaperProps } from './Wallpaper.props';
import equals from 'react-fast-compare';
import { enhance } from '@common';

const defaultImage = require('./bg.png');

const WallpaperComponent = ({ preset = 'stretch', style: styleOverride, backgroundImage }: WallpaperProps) => {

  const presetToUse = presets[preset] || presets.stretch;
  const style = useMemo(() => enhance([presetToUse, styleOverride]), [styleOverride]);

  const source = backgroundImage || defaultImage;
  return (
    <Image source={source} style={style} />
  )
}
export const Wallpaper = memo(WallpaperComponent, (prevProps, nextProps) => equals(prevProps, nextProps))