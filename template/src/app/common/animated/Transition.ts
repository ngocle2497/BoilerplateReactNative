import {useEffect} from 'react';
import Animated, {
  Easing,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {sharedBin} from './Math';

export const useSharedTransition = (
  state: boolean | number,
  config: Animated.WithTimingConfig = {
    duration: 500,
    easing: Easing.bezier(0.33, 0.01, 0, 1),
  },
): Animated.SharedValue<number> => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);
  return useDerivedValue(() => withTiming(value.value, config));
};

export const useSharedSpringTransition = (
  state: boolean,
  config?: Animated.WithSpringConfig,
): Animated.SharedValue<number> => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);
  return useDerivedValue(() => withSpring(value.value, config));
};
