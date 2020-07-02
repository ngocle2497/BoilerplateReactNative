import React, { useState, memo } from 'react';
import { StyleSheet, LayoutChangeEvent } from 'react-native';
import { ProgressLinearProps } from './ProgressLinear.props';
import { useValues, timing, clamp, transformOrigin } from '@animated';
import Animated, { useCode, set, interpolate } from 'react-native-reanimated';
import equals from 'react-fast-compare';

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 4,
    backgroundColor: '#dbdbdb',
    marginVertical: 3,
  },
  fg: {
    backgroundColor: '#0057e7',
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export const ProgressLinearComponent = (props: ProgressLinearProps) => {
  const { progress } = props;
  const [progressAnimated] = useValues([progress], []);
  const [widthProgress, setWidthProgress] = useState(0);
  const actualProgress = clamp(progressAnimated, 0, 100);
  const scaleX = interpolate(actualProgress, {
    inputRange: [0, 100],
    outputRange: [0, 1],
  });
  useCode(
    () => [
      set(progressAnimated, timing({ from: progressAnimated, to: progress })),
    ],
    [progress],
  );
  const _onLayoutBg = (e: LayoutChangeEvent) => {
    setWidthProgress(e.nativeEvent.layout.width);
  };
  return (
    <Animated.View onLayout={_onLayoutBg} style={[styles.bg]}>
      <Animated.View
        style={[
          styles.fg,
          { transform: transformOrigin({ x: -widthProgress / 2, y: 0 }, { scaleX }) },
        ]}
      />
    </Animated.View>
  );
};

export const ProgressLinear = memo(
  ProgressLinearComponent, equals
);
