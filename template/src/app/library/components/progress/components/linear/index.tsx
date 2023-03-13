import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, ViewStyle } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { sharedTiming, useInterpolate, useShareClamp } from '@animated';

import { styles } from './styles';
import { ProgressLinearProps } from './type';

import { COLOR_BG, COLOR_FG, STROKE_WIDTH } from '../constant';

export const ProgressLinear = ({
  progress,
  bg = COLOR_BG,
  fg = COLOR_FG,
  radius = 4,
  strokeWidth = STROKE_WIDTH,
}: ProgressLinearProps) => {
  // state
  const [widthProgress, setWidthProgress] = useState(0);

  const progressAnimated = useDerivedValue(() => sharedTiming(progress));

  const actualProgress = useShareClamp(progressAnimated, 0, 100);

  const translateX = useInterpolate(
    actualProgress,
    [0, 100],
    [-widthProgress, 0],
  );

  // style
  const bgStyle = useMemo<ViewStyle[]>(
    () => [
      styles.bg,
      {
        backgroundColor: bg,
        height: strokeWidth,
        borderRadius: radius,
      },
    ],
    [bg, radius, strokeWidth],
  );

  const fgStyle = useMemo<ViewStyle[]>(
    () => [
      styles.fg,
      {
        backgroundColor: fg,
        borderRadius: radius,
      },
    ],
    [fg, radius],
  );

  // function
  const _onLayoutBg = (e: LayoutChangeEvent) => {
    setWidthProgress(e.nativeEvent.layout.width);
  };

  // reanimated style
  const foregroundStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // render
  return (
    <Animated.View onLayout={_onLayoutBg} style={bgStyle}>
      <Animated.View style={[fgStyle, foregroundStyle]} />
    </Animated.View>
  );
};
