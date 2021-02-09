import {CustomOmit} from '@common';
import {
  ImageStyle as RNImageStyle,
  ViewStyle as RNViewStyle,
  TextStyle as RNTextStyle,
  PerpectiveTransform,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  TranslateXTransform,
  TranslateYTransform,
  SkewXTransform,
  SkewYTransform,
} from 'react-native';
import Animated from 'react-native-reanimated';

export type ImageStyle = CustomOmit<
  RNImageStyle,
  | 'backfaceVisibility'
  | 'alignContent'
  | 'alignItems'
  | 'alignSelf'
  | 'aspectRatio'
  | 'backfaceVisibility'
  | 'direction'
  | 'resizeMode'
  | 'display'
  | 'justifyContent'
  | 'overflow'
  | 'flexDirection'
  | 'flexWrap'
  | 'position'
  | 'transformMatrix'
>;
export type ViewStyle = CustomOmit<
  RNViewStyle,
  | 'alignContent'
  | 'alignItems'
  | 'alignSelf'
  | 'aspectRatio'
  | 'direction'
  | 'display'
  | 'justifyContent'
  | 'overflow'
  | 'backfaceVisibility'
  | 'borderStyle'
  | 'flexDirection'
  | 'flexWrap'
  | 'position'
  | 'rotation'
  | 'transformMatrix'
>;
export type TextStyle = CustomOmit<
  RNTextStyle,
  | 'alignContent'
  | 'alignItems'
  | 'alignSelf'
  | 'aspectRatio'
  | 'backfaceVisibility'
  | 'direction'
  | 'display'
  | 'justifyContent'
  | 'overflow'
  | 'borderStyle'
  | 'fontFamily'
  | 'fontWeight'
  | 'writingDirection'
  | 'textTransform'
  | 'textAlign'
  | 'textDecorationLine'
  | 'textDecorationStyle'
>;
export type Transforms = PerpectiveTransform &
  RotateTransform &
  RotateXTransform &
  RotateYTransform &
  RotateZTransform &
  ScaleTransform &
  ScaleXTransform &
  ScaleYTransform &
  TranslateXTransform &
  TranslateYTransform &
  SkewXTransform &
  SkewYTransform;
type AnimatedConfig = (
  | ({
      type?: 'spring';
    } & Animated.WithSpringConfig)
  | ({type: 'timing'} & Animated.WithTimingConfig)
  | ({type: 'decay'} & Animated.WithDecayConfig)
) & {delay?: number};

export type TransitionConfig = AnimatedConfig & {
  /**
   * Delay animation
   * @default undefined
   */
  delay?: number;
  /**
   *  Number of repetations that the animation is going to be run for. To make it infinite, use the `loop` boolean.
   * @default 0
   */
  repeat?: number;
  /**
   * Setting this to `true` is the same as `repeat: Infinity`
   * @default false
   */
  loop?: boolean;
  /**
   * Specify whether we should attempt to reverse the animation every other repetition
   * @default true
   */
  repeatReverse?: boolean;
};
type StyleValueOrArray<T> = {
  [key in keyof T]:
    | T[keyof T]
    | (
        | ({
            value: T[keyof T];
          } & AnimatedConfig)
        | T[keyof T]
      )[];
};
export type StyleValueWithReplacedTransforms<StyleProp> = Partial<Transforms> &
  Omit<StyleProp, 'transform'>;

export interface ModifyProps<
  AnimateType = ImageStyle & ViewStyle & TextStyle,
  AnimatedWithTransitions = StyleValueWithReplacedTransforms<AnimateType>,
  Animate = StyleValueOrArray<AnimatedWithTransitions>
> {
  animate?: Animate;
  start?: AnimatedWithTransitions;
  exit?: AnimatedWithTransitions;
  onDidAnimate?: (finished: boolean, key: string) => void;
  transition?: TransitionConfig &
    Partial<Record<keyof Animate, TransitionConfig>>;
  delay?: number;
}
export type ModifyAnimateProps<Animate> = ModifyProps<Animate>['animate'];
export type ModifyTransitionProps<Animate> = ModifyProps<Animate>['transition'];
export type ModifyFromProps<Animate> = ModifyProps<Animate>['start'];
export type ModifyAExitProps<Animate> = ModifyProps<Animate>['exit'];
