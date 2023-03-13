import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

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
import { execFunc } from '@common';

import {
  BORDER_OFF_COLOR,
  BORDER_RADIUS_IOS,
  OFF_COLOR,
  OFF_POSITION_IOS,
  ON_COLOR,
  ON_POSITION_IOS,
  THUMB_SIZE_IOS,
  TRACK_HEIGHT_IOS,
  TRACK_WIDTH_IOS,
} from './constants';
import { SwitchProps } from './type';

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH_IOS,
    height: TRACK_HEIGHT_IOS,
    borderRadius: BORDER_RADIUS_IOS,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE_IOS,
    height: THUMB_SIZE_IOS,
    borderColor: BORDER_OFF_COLOR,
    borderRadius: THUMB_SIZE_IOS / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: BORDER_OFF_COLOR,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export const Switch = ({
  onToggle,
  value: overwriteValue,
  disable = false,
  initialValue = false,
}: Omit<SwitchProps, 'type'>) => {
  // state
  const [value, setValue] = useState<boolean>(initialValue);

  // reanimated
  const progress = useSharedTransition(overwriteValue ?? value);

  const opacity = useMix(useSharedTransition(disable), 1, 0.5);

  const translateX = useInterpolate(
    progress,
    [0, 1],
    [OFF_POSITION_IOS, ON_POSITION_IOS],
    Extrapolate.CLAMP,
  );

  const backgroundColor = useInterpolateColor(
    progress,
    [0, 1],
    [OFF_COLOR, ON_COLOR],
  );

  // function
  const _onToggle = useCallback(() => {
    if (typeof overwriteValue === 'boolean') {
      execFunc(onToggle, overwriteValue);
    } else {
      execFunc(onToggle, !value);

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
    <TouchableWithoutFeedback disabled={disable} onPress={_onToggle}>
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
