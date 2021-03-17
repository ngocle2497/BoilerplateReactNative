import {CustomOmit} from '@common';
import {
  ViewStyle as RNViewStyle,
  PerpectiveTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  TranslateXTransform,
  TranslateYTransform,
} from 'react-native';
import Animated from 'react-native-reanimated';

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

interface RotateTransform {
  rotate: number;
}
interface RotateXTransform {
  rotateX: number;
}

interface RotateYTransform {
  rotateY: number;
}

interface RotateZTransform {
  rotateZ: number;
}
interface SkewXTransform {
  skewX: number;
}

interface SkewYTransform {
  skewY: number;
}
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
export interface ReAnimatableProps<
  AnimateType = ViewStyle,
  AnimatedWithTransitions = Partial<Transforms> & Omit<AnimateType, 'transform'>
> {
  animate?: AnimatedWithTransitions;
  start?: AnimatedWithTransitions;
  exit?: AnimatedWithTransitions;
  onDidAnimate?: (finished: boolean, key: string) => void;
  transition?: TransitionConfig &
    Partial<Record<keyof AnimatedWithTransitions, TransitionConfig>>;
  delay?: number;
}
export type ModifyAnimateProps<Animate> = ReAnimatableProps<Animate>['animate'];
export type ModifyTransitionProps<
  Animate
> = ReAnimatableProps<Animate>['transition'];
export type ModifyFromProps<Animate> = ReAnimatableProps<Animate>['start'];
export type ModifyAExitProps<Animate> = ReAnimatableProps<Animate>['exit'];
