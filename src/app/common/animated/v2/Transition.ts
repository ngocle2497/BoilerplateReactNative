import Animated, {
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const useSharedTransition = (
  state: boolean,
  config?: Animated.WithTimingConfig,
): Animated.SharedValue<number> =>
  useDerivedValue(() =>
    state ? withTiming(1, config) : withTiming(0, config),
  );

export const useSharedSpringTransition = (
  state: boolean,
  config?: Animated.WithSpringConfig,
): Animated.SharedValue<number> =>
  useDerivedValue(() =>
    state ? withSpring(1, config) : withSpring(0, config),
  );
