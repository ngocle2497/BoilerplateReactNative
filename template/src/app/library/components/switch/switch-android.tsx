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
const THUMB_SIZE = 20;
const TRACK_HEIGHT = 16;
const WIDTH = 28;
const MARGIN = 2;
const OFF_POSITION = -THUMB_SIZE / 3;
const ON_POSITION = WIDTH - THUMB_SIZE * 0.75;
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4;

// colors
const ON_COLOR = '#34C759';
const ON_TRACK_COLOR = 'rgba(52, 199, 89, 0.4)';
const OFF_TRACK_COLOR = 'rgba(0, 0, 0, 0.3)';
const OFF_COLOR = '#e6e6e6';
const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.05)';
const SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
  },
  track: {
    width: WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: BORDER_RADIUS,
    borderWidth: MARGIN / 2,
    borderColor: BORDER_OFF_COLOR,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    top: -(THUMB_SIZE - TRACK_HEIGHT + MARGIN) / 2,
    height: THUMB_SIZE,
    borderColor: BORDER_OFF_COLOR,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: SHADOW_COLOR,
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
  const backgroundTrackColor = useInterpolateColor(
    progress,
    [0, 1],
    [OFF_TRACK_COLOR, ON_TRACK_COLOR],
  );
  const backgroundThumbColor = useInterpolateColor(
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
  const wrapAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundTrackColor.value as string,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundThumbColor.value as string,
    transform: [{ translateX: translateX.value }],
  }));

  // render
  return (
    <Animated.View style={[styles.wrap, wrapAnimatedStyle]}>
      <TouchableWithoutFeedback disabled={disable} onPress={toggle}>
        <Animated.View style={[styles.track, animatedTrackStyle]}>
          <Animated.View style={[styles.thumb, animatedThumbStyle]} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
export const Switch = memo(SwitchComponent, equals);
