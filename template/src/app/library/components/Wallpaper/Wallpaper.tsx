import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import {Img} from '../Image/Image';

import {WallpaperProps} from './Wallpaper.props';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
const deviceH = Dimensions.get('screen').height;
const windowH = Dimensions.get('window').height;
const bottomNavBarH = deviceH - windowH;

const WallpaperComponent = ({
  backgroundImage = 'bg_wallpaper',
}: WallpaperProps) => {
  // state
  const {height, width} = useWindowDimensions();
  const containerStyle = useMemo<ViewStyle>(
    () => ({width, height: height + bottomNavBarH}),
    [height, width],
  );

  // render
  return (
    <View pointerEvents={'none'} style={[styles.container, containerStyle]}>
      <Img source={backgroundImage} />
    </View>
  );
};
export const Wallpaper = memo(WallpaperComponent, equals);
