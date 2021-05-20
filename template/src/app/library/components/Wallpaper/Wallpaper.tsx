import {enhance} from '@common';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {StyleProp, useWindowDimensions} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';
import {Img} from '../Image/Image';
import {presets} from './Wallpaper.presets';
import {WallpaperProps} from './Wallpaper.props';

const WallpaperComponent = ({
  preset = 'stretch',
  style: styleOverride,
  backgroundImage = 'bg_wallpaper',
}: WallpaperProps) => {
  // state
  const {height, width} = useWindowDimensions();

  // style
  const style = useMemo<StyleProp<ImageStyle>>(
    () =>
      enhance([
        presets[preset] as ImageStyle,
        {width, height},
        styleOverride as ImageStyle,
      ]),
    [preset, width, height, styleOverride],
  );

  // render
  return (
    <Img
      containerStyle={presets[preset]}
      source={backgroundImage}
      style={style}
    />
  );
};
export const Wallpaper = memo(WallpaperComponent, equals);
