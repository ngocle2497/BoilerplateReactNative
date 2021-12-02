import {sharedTiming, useInterpolate, useRadian} from '@animated';
import {enhance} from '@common';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {
  Extrapolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import {STROKE_WIDTH} from './constant';

const EMPTY_COLOR = 'red';

interface CircularProps {
  progress: number;

  bg: string;

  fg: string;

  radius: number;

  strokeWidth: number;
}

const styles = StyleSheet.create({
  empty: {
    borderColor: EMPTY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-135deg'}],
  },
  indicator: {
    position: 'absolute',
    borderLeftColor: 'green',
    borderTopColor: 'green',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
  cover: {
    position: 'absolute',
    borderLeftColor: EMPTY_COLOR,
    borderTopColor: EMPTY_COLOR,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export const CircularComponent = ({
  progress,
  radius,
  fg,
  bg,
}: CircularProps) => {
  //state
  const progressAnimated = useDerivedValue(() => sharedTiming(progress));

  const firstRotate = useRadian(
    useInterpolate(progressAnimated, [0, 50], [0, 180], Extrapolate.CLAMP),
  );

  const secondRotate = useRadian(
    useInterpolate(progressAnimated, [0, 100], [0, 360], Extrapolate.CLAMP),
  );

  const secondOpacity = useInterpolate(
    progressAnimated,
    [0, 49.9999999, 50, 100],
    [0, 0, 1, 1],
    Extrapolate.CLAMP,
  );

  // style
  const baseStyle = useMemo<ViewStyle>(
    () => ({
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      borderWidth: STROKE_WIDTH,
    }),
    [radius],
  );

  const emptyStyle = useMemo<ViewStyle>(
    () => enhance([baseStyle, styles.empty, {borderColor: bg}]) as ViewStyle,
    [baseStyle, bg],
  );

  const coverStyle = useMemo<ViewStyle>(
    () =>
      enhance([
        baseStyle,
        styles.cover,
        {borderLeftColor: bg, borderTopColor: bg},
      ]) as ViewStyle,
    [baseStyle, bg],
  );

  const indicatorStyle = useMemo<ViewStyle>(
    () =>
      enhance([
        baseStyle,
        styles.indicator,
        {borderLeftColor: fg, borderTopColor: fg},
      ]) as ViewStyle,
    [baseStyle, fg],
  );
  // reanimated style
  const firstIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{rotate: firstRotate.value}],
  }));

  const secondIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{rotate: secondRotate.value}],
    opacity: secondOpacity.value,
  }));

  // render
  return (
    <View style={[emptyStyle]}>
      <Animated.View style={[indicatorStyle, firstIndicatorStyle]} />
      <Animated.View style={[coverStyle]} />
      <Animated.View style={[indicatorStyle, secondIndicatorStyle]} />
    </View>
  );
};
export const Circular = memo(CircularComponent, equals);
