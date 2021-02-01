import Animated, {
  interpolate,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";

import {sharedClamp} from "./Math";

export const useInterpolate = (
  progress: Animated.SharedValue<number>,
  input: number[],
  output: number[],
  type?: Animated.Extrapolate,
) => useDerivedValue(() => interpolate(progress.value, input, output, type));

export const useInterpolateColor = (
  progress: Animated.SharedValue<number>,
  input: number[],
  output: (number | string)[],
  colorSpace?: "RGB" | "HSV" | undefined,
) =>
  useDerivedValue(() =>
    interpolateColor(progress.value, input, output, colorSpace),
  );

export const useMix = (
  progress: Animated.SharedValue<number>,
  lowerValue: number,
  upperValue: number,
) =>
  useDerivedValue(
    () => lowerValue + progress.value * (upperValue - lowerValue),
  );

export const useRadian = (value: Animated.SharedValue<number>) =>
  useDerivedValue(() => `${value.value}deg`);

export const useShareClamp = (
  value: Animated.SharedValue<number>,
  lowerValue: number,
  upperValue: number,
) => useDerivedValue(() => sharedClamp(value.value, lowerValue, upperValue));
