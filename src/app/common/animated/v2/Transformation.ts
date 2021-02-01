import Animated from "react-native-reanimated";

export const sharedTransformOrigin = (
  {x, y}: {x: number; y: number},
  ...transformations: Animated.AnimatedTransform
): Animated.AnimatedTransform => {
  "worklet";
  return [
    {translateX: x},
    {translateY: y},
    ...transformations,
    {translateX: x * -1},
    {translateY: y * -1},
  ];
};
