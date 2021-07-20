import Animated, {
  Easing,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const sharedTiming = (
  toValue: number,
  config?: Animated.WithTimingConfig,
  callBack?: (finished: boolean) => void,
) => {
  'worklet';
  return withTiming(
    toValue,
    Object.assign(
      {
        duration: 500,
        easing: Easing.bezier(0.33, 0.01, 0, 1),
      },
      config,
    ),
    callBack,
  );
};

export const sharedSpring = (
  toValue: number,
  config?: Animated.WithSpringConfig,
  callBack?: (finished: boolean) => void,
) => {
  'worklet';
  return withSpring(toValue, config, callBack);
};
