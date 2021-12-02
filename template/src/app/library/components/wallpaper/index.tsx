import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import {Img} from '../img';

import {WallpaperProps} from './type';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
const deviceH = Dimensions.get('screen').height;

const WallpaperComponent = ({
  backgroundImage = 'bg_wallpaper',
}: WallpaperProps) => {
  // state
  const {width} = useWindowDimensions();
  const containerStyle = useMemo<ViewStyle>(
    () => ({width, height: deviceH}),
    [width],
  );

  // render
  return (
    <View pointerEvents={'none'} style={[styles.container, containerStyle]}>
      <Img source={backgroundImage} />
    </View>
  );
};
export const Wallpaper = memo(WallpaperComponent, equals);
