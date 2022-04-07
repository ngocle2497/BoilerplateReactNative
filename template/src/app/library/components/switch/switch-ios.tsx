import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import equals from 'react-fast-compare';
import Animated, {
  Extrapolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  useInterpolate,
  useInterpolateColor,
  useMix,
  useSharedTransition,
} from '@animated';
import { onCheckType } from '@common';

import { SwitchProps } from './tye';

// dimensions
const THUMB_SIZE = 28;
const WIDTH = 51;
const MARGIN = 3;
const OFF_POSITION = 0.5;
const ON_POSITION = WIDTH - THUMB_SIZE - MARGIN - 0.5;
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4;

// colors
const ON_COLOR = '#34C759';
const OFF_COLOR = 'rgba(255,255,255,0.05)';
const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.1)';

const styles = StyleSheet.create({
  track: {
    width: WIDTH,
    height: THUMB_SIZE + MARGIN,
    borderRadius: BORDER_RADIUS,
    borderWidth: MARGIN / 2,
    borderColor: 'transparent',
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderColor: BORDER_OFF_COLOR,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: BORDER_OFF_COLOR,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});

const SwitchComponent = ({
  onToggle,
  initialValue = false,
  disable = false,
  value: overwriteValue,
}: Omit<SwitchProps, 'type'>) => {
  // state
  const [value, setValue] = useState<boolean>(initialValue);

  // reanimated
  const progress = useSharedTransition(overwriteValue ?? value);
  const opacity = useMix(useSharedTransition(disable), 1, 0.5);
  const translateX = useInterpolate(
    progress,
    [0, 1],
    [OFF_POSITION, ON_POSITION],
    Extrapolate.CLAMP,
  );
  const backgroundColor = useInterpolateColor(
    progress,
    [0, 1],
    [OFF_COLOR, ON_COLOR],
  );

  // function
  const toggle = useCallback(() => {
    if (typeof overwriteValue === 'boolean') {
      if (onCheckType(onToggle, 'function')) {
        onToggle && onToggle(!overwriteValue);
      }
    } else {
      if (onCheckType(onToggle, 'function')) {
        onToggle && onToggle(!value);
      }
      setValue(v => !v);
    }
  }, [onToggle, overwriteValue, value]);

  // reanimated style
  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value as string,
    opacity: opacity.value,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // render
  return (
    <TouchableWithoutFeedback disabled={disable} onPress={toggle}>
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
export const Switch = memo(SwitchComponent, equals);
