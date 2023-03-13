import { useEffect } from 'react';

import Animated, {
  Easing,
  useDerivedValue,
  useSharedValue,
  withSpring,
  WithSpringConfig,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

import { sharedBin } from './math';

/**
 * Return value runs from 0 to 1 when state change using withTiming
 */
export const useSharedTransition = (
  state: boolean | number,
  config?: WithTimingConfig,
  initialValue?: number,
): Animated.SharedValue<number> => {
  const value = useSharedValue(initialValue ?? 0);

  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);

  return useDerivedValue(() =>
    withTiming(
      value.value,
      Object.assign(
        { duration: 500, easing: Easing.bezier(0.33, 0.01, 0, 1) },
        config,
      ),
    ),
  );
};

/**
 * Return value runs from 0 to 1 when state change using withSpring
 */
export const useSharedSpringTransition = (
  state: boolean,
  config?: WithSpringConfig,
  initialValue?: number,
): Animated.SharedValue<number> => {
  const value = useSharedValue(initialValue ?? 0);

  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);

  return useDerivedValue(() => withSpring(value.value, config));
};
