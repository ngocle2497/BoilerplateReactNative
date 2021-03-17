import React, {Component} from 'react';
import {useWindowDimensions} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  measure,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {sharedClamp, sharedMin, sharedMax} from './Math';

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
  colorSpace?: 'RGB' | 'HSV' | undefined,
) => {
  'worklet';
  return useDerivedValue(() =>
    interpolateColor(progress.value, input, output, colorSpace),
  );
};

export const useMix = (
  progress: Animated.SharedValue<number>,
  x: number,
  y: number,
) => {
  'worklet';
  return useDerivedValue(() => x + progress.value * (y - x));
};

export const useRadian = (value: Animated.SharedValue<number>) =>
  useDerivedValue(() => {
    'worklet';
    return `${value.value}deg`;
  });

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

export const useMin = (...args: Animated.SharedValue<number>[]) => {
  'worklet';
  return useDerivedValue(() => sharedMin(...args.map(x => x.value)));
};

export const useMax = (...args: Animated.SharedValue<number>[]) => {
  'worklet';
  return useDerivedValue(() => sharedMax(...args.map(x => x.value)));
};

export function useInsideView<T extends Component>(
  wrapHeight: number | undefined = undefined,
): [React.RefObject<T>, Animated.SharedValue<boolean>] {
  const {height} = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const ref = useAnimatedRef<T>();
  const toggle = useSharedValue(0);
  const rectBottom = useSharedValue(0);
  const rectTop = useSharedValue(0);
  const visible = useDerivedValue(() => {
    return rectTop.value <= (wrapHeight || height) && rectBottom.value >= 0;
  });

  useDerivedValue(() => {
    try {
      const measured = measure(ref);
      rectTop.value = measured.pageY - top;
      rectBottom.value = measured.pageY + measured.height - top;
      toggle.value = toggle.value === 1 ? 0 : 1;
    } catch {
      toggle.value = toggle.value === 1 ? 0 : 1;
    }
  });
  return [ref, visible];
}

type Vector = {
  x: number;
  y: number;
};
export const useVector = ({x, y}: Vector) => {
  const ox = useSharedValue(x);
  const oy = useSharedValue(y);
  return [ox, oy];
};
