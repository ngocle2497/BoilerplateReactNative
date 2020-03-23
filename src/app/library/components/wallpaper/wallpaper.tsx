import React from 'react';
import { Image } from 'react-native';
import { presets } from './wallpaper.presets';
import { WallpaperProps } from './wallpaper.props';

const defaultImage = require('./bg.png');

export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = 'stretch', style: styleOverride, backgroundImage, dependency = [] } = props;

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch;
  const style = { ...presetToUse, ...styleOverride };

  // figure out which image to use
  const source = backgroundImage || defaultImage;
  const dependencyList = [source, ...dependency]
  return React.useMemo(() => <Image source={source} style={style} />, dependencyList)
}
