import React, {useState, memo} from 'react';
import {StyleSheet, LayoutChangeEvent} from 'react-native';
import {useShareClamp, useInterpolate, sharedTiming} from '@animated';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import equals from 'react-fast-compare';

import {ProgressLinearProps} from './type';

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    flex: 1,
    height: 4,
    backgroundColor: '#dbdbdb',
    marginVertical: 3,
    borderRadius: 50,
    overflow: 'hidden',
  },
  fg: {
    backgroundColor: '#0057e7',
    borderRadius: 50,
    flex: 1,
  },
});

export const ProgressLinearComponent = (props: ProgressLinearProps) => {
  // state
  const {progress} = props;
  const [widthProgress, setWidthProgress] = useState(0);
  const progressAnimated = useDerivedValue(() => sharedTiming(progress));
  const actualProgress = useShareClamp(progressAnimated, 0, 100);
  const translateX = useInterpolate(
    actualProgress,
    [0, 100],
    [-widthProgress, 0],
  );

  // function
  const _onLayoutBg = (e: LayoutChangeEvent) => {
    setWidthProgress(e.nativeEvent.layout.width);
  };

  // reanimated style
  const foregroundStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  // render
  return (
    <Animated.View onLayout={_onLayoutBg} style={[styles.bg]}>
      <Animated.View style={[styles.fg, foregroundStyle]} />
    </Animated.View>
  );
};

export const ProgressLinear = memo(ProgressLinearComponent, equals);
