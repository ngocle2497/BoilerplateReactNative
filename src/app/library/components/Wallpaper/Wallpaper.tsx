import React, { memo, useMemo } from 'react';
import { presets } from './Wallpaper.presets';
import { WallpaperProps } from './Wallpaper.props';
import equals from 'react-fast-compare';
import { enhance } from '@common';
import { Img } from '../Image/Image';

const WallpaperComponent = ({ preset = 'stretch', style: styleOverride, backgroundImage = 'bg_wallpaper' }: WallpaperProps) => {

  const presetToUse = presets[preset] || presets.stretch;
  const style = useMemo(() => enhance([presetToUse, styleOverride]), [styleOverride]);

  return (
    <Img source={backgroundImage} style={style} />
  )
}
export const Wallpaper = memo(WallpaperComponent, (prevProps, nextProps) => equals(prevProps, nextProps))