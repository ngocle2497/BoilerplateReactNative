import {
  ExtrapolationType,
  interpolate,
  interpolateColor,
  SharedValue,
  useDerivedValue,
} from 'react-native-reanimated';

import { sharedClamp, sharedMax, sharedMin } from './math';

/**
 * Interpolate number
 */
export const useInterpolate = (
  progress: SharedValue<number>,
  input: number[],
  output: number[],
  type?: ExtrapolationType,
  // eslint-disable-next-line max-params
) => useDerivedValue(() => interpolate(progress.value, input, output, type));

/**
 * Interpolate color
 */
export const useInterpolateColor = (
  progress: SharedValue<number>,
  input: number[],
  output: string[],
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
export const useMix = (progress: SharedValue<number>, x: number, y: number) => {
  'worklet';

  return useDerivedValue(() => x + progress.value * (y - x));
};

/**
 * Convert number to radian
 */
export const useRadian = (value: SharedValue<number>) =>
  useDerivedValue(() => {
    'worklet';

    return `${value.value}deg`;
  });

/**
 * Clamp value when out of range
 */
export const useShareClamp = (
  value: SharedValue<number>,
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
export const useMin = (...args: SharedValue<number>[]) => {
  'worklet';

  return useDerivedValue(() => sharedMin(...args.map(x => x.value)));
};

/**
 * Return max number of args
 */
export const useMax = (...args: SharedValue<number>[]) => {
  'worklet';

  return useDerivedValue(() => sharedMax(...args.map(x => x.value)));
};
