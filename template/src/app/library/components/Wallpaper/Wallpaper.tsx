import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {useWindowDimensions, View, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Img} from '../Image/Image';

import {WallpaperProps} from './Wallpaper.props';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

const WallpaperComponent = ({
  backgroundImage = 'bg_wallpaper',
}: WallpaperProps) => {
  // state
  const {height, width} = useWindowDimensions();
  const inset = useSafeAreaInsets();
  const containerStyle = useMemo<ViewStyle>(
    () => ({width, height: height + inset.top}),
    [height, inset.top, width],
  );

  // render
  return (
    <View pointerEvents={'none'} style={[styles.container, containerStyle]}>
      <Img source={backgroundImage} />
    </View>
  );
};
export const Wallpaper = memo(WallpaperComponent, equals);
