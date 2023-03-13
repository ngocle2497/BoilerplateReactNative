import React, { Component, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import Animated, {
  AnimationCallback,
  Easing,
  ExtrapolationType,
  interpolate,
  interpolateColor,
  measure,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { sharedClamp, sharedMax, sharedMin } from './math';

/**
 * Interpolate number
 */
export const useInterpolate = (
  progress: Animated.SharedValue<number>,
  input: number[],
  output: number[],
  type?: ExtrapolationType,
  // eslint-disable-next-line max-params
) => useDerivedValue(() => interpolate(progress.value, input, output, type));

/**
 * Interpolate color
 */
export const useInterpolateColor = (
  progress: Animated.SharedValue<number>,
  input: number[],
  output: (number | string)[],
  colorSpace?: 'RGB' | 'HSV' | undefined,
  // eslint-disable-next-line max-params
) => {
  'worklet';

  return useDerivedValue(() =>
    interpolateColor(progress.value, input, output, colorSpace),
  );
};

/**
 * Linear interpolation between x and y using a to weight between them
 */
export const useMix = (
  progress: Animated.SharedValue<number>,
  x: number,
  y: number,
) => {
  'worklet';

  return useDerivedValue(() => x + progress.value * (y - x));
};

/**
 * Convert number to radian
 */
export const useRadian = (value: Animated.SharedValue<number>) =>
  useDerivedValue(() => {
    'worklet';

    return `${value.value}deg`;
  });

/**
 * Clamp value when out of range
 */
export const useShareClamp = (
  value: Animated.SharedValue<number>,
  lowerValue: number,
  upperValue: number,
) => {
  'worklet';

  return useDerivedValue(() =>
    sharedClamp(value.value, lowerValue, upperValue),
  );
};

/**
 * Return min number of args
 */
export const useMin = (...args: Animated.SharedValue<number>[]) => {
  'worklet';

  return useDerivedValue(() => sharedMin(...args.map(x => x.value)));
};

/**
 * Return max number of args
 */
export const useMax = (...args: Animated.SharedValue<number>[]) => {
  'worklet';

  return useDerivedValue(() => sharedMax(...args.map(x => x.value)));
};

/**
 * Return view inside screen or not
 */
export function useInsideView<T extends Component>(
  wrapHeight: number | undefined = undefined,
): [React.RefObject<T>, Animated.SharedValue<boolean>] {
  const { height } = useWindowDimensions();

  const { top } = useSafeAreaInsets();

  const ref = useAnimatedRef<T>();

  const toggle = useSharedValue(0);

  const rectBottom = useSharedValue(0);

  const rectTop = useSharedValue(0);

  const visible = useDerivedValue(() => {
    return rectTop.value <= (wrapHeight || height) && rectBottom.value >= 0;
  });

  useDerivedValue(() => {
    const measured = measure(ref);

    if (!measured) {
      return;
    }

    rectTop.value = measured.pageY - top;

    rectBottom.value = measured.pageY + measured.height - top;

    toggle.value = toggle.value === 1 ? 0 : 1;
  });

  return [ref, visible];
}

type Vector = {
  x: number;
  y: number;
};

/**
 * Create Animated Shared Value Vector
 */
export const useVector = ({ x, y }: Vector) => {
  const ox = useSharedValue(x);

  const oy = useSharedValue(y);

  return [ox, oy];
};

type UseTimingParams = {
  toValue?: number;
  from?: number;
  config?: WithTimingConfig;
  callback?: AnimationCallback;
  delay?: number;
};

export const useTiming = ({
  callback,
  config,
  from = 0,
  toValue = 1,
  delay = 0,
}: UseTimingParams = {}) => {
  const progress = useSharedValue(from);

  // effect
  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(
        toValue,
        Object.assign(
          {
            duration: 500,
            easing: Easing.bezier(0.33, 0.01, 0, 1),
          },
          config,
        ),
        callback,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // result
  return progress;
};

type UseSpringParams = {
  toValue?: number;
  from?: number;
  config?: WithSpringConfig;
  callback?: AnimationCallback;
  delay?: number;
};

export const useSpring = ({
  callback,
  config,
  from = 0,
  toValue = 1,
  delay = 0,
}: UseSpringParams = {}) => {
  const progress = useSharedValue(from);

  // effect
  useEffect(() => {
    progress.value = withDelay(delay, withSpring(toValue, config, callback));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // result
  return progress;
};
