import { TransformsStyle } from 'react-native';

type RNTransform = Exclude<TransformsStyle['transform'], undefined>;

/**
 * Keep current position when changing properties AnimatedTransform.
 */
export const sharedTransformOrigin = (
  { x, y }: { x: number; y: number },
  transformations: RNTransform,
): RNTransform => {
  'worklet';

  return [
    { translateX: x },
    { translateY: y },
    ...transformations,
    { translateX: x * -1 },
    { translateY: y * -1 },
  ] as RNTransform;
};
