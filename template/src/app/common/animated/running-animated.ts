import {
  AnimationCallback,
  Easing,
  withSpring,
  WithSpringConfig,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

/**
 * Updates position by running timing based animation from a given position to a destination determined by toValue.
 */
export const sharedTiming = (
  toValue: number,
  config?: WithTimingConfig,
  callBack?: AnimationCallback,
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

/**
 * Updates position and velocity by running a single step of spring based animation
 */
export const sharedSpring = (
  toValue: number,
  config?: WithSpringConfig,
  callBack?: AnimationCallback,
) => {
  'worklet';

  return withSpring(toValue, config, callBack);
};
