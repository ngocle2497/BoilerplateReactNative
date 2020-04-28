import React, { memo } from 'react';
import { Image } from 'react-native';
import { presets } from './Wallpaper.presets';
import { WallpaperProps } from './Wallpaper.props';
import { equals } from 'ramda';

const defaultImage = require('./bg.png');

const WallpaperComponent = (props: WallpaperProps) => {
  // grab the props
  const { preset = 'stretch', style: styleOverride, backgroundImage } = props;

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch;
  const style = { ...presetToUse, ...styleOverride };

  // figure out which image to use
  const source = backgroundImage || defaultImage;
  return (
    <Image source={source} style={style} />
  )
}
export const Wallpaper = memo(WallpaperComponent, (prevProps, nextProps) => equals(prevProps, nextProps))