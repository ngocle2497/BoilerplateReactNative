import { ViewStyle } from 'react-native';

import Animated, { interpolate } from 'react-native-reanimated';

export type TypeIn =
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'lightSpeedIn'
  | 'slideInDown'
  | 'slideInUp'
  | 'slideInLeft'
  | 'slideInRight'
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInUp'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'bounceIn'
  | 'bounceInUp'
  | 'bounceInDown'
  | 'bounceInRight'
  | 'bounceInLeft'
  | 'bounce'
  | 'flash'
  | 'jello'
  | 'pulse'
  | 'rotate'
  | 'shake'
  | 'swing'
  | 'rubberBand'
  | 'tada'
  | 'wobble';

export type TypeOut =
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'lightSpeedOut'
  | 'slideOutDown'
  | 'slideOutUp'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutUp'
  | 'zoomOutLeft'
  | 'zoomOutRight'
  | 'bounceOut'
  | 'bounceOutUp'
  | 'bounceOutDown'
  | 'bounceOutRight'
  | 'bounceOutLeft';

type AnimatedOption = {
  screenHeight: number;
  progress: Animated.SharedValue<number>;
  isOut: Animated.SharedValue<boolean>;
  typeIn: TypeIn;
  typeOut: TypeOut;
  screenWidth: number;
};

const withAnimatedIn = ({
  progress,
  screenHeight,
  typeIn,
  screenWidth,
}: AnimatedOption): ViewStyle => {
  'worklet';
  const withInterpolate = (
    outputRange: number[] = [0, 1],
    inputRange: number[] = [0, 1],
  ) => interpolate(progress.value, inputRange, outputRange);

  const fadeInOpacity = withInterpolate([0, 1]);
  const bounceInOpacity = withInterpolate([0, 1, 1], [0, 0.6, 1]);

  switch (typeIn) {
    // fade
    case 'fadeIn':
      return { opacity: fadeInOpacity };
    case 'fadeInDown':
      return {
        opacity: fadeInOpacity,
        transform: [{ translateY: withInterpolate([-100, 0]) }],
      };
    case 'fadeInDownBig':
      return {
        opacity: fadeInOpacity,
        transform: [{ translateY: withInterpolate([-500, 0]) }],
      };
    case 'fadeInUp':
      return {
        opacity: fadeInOpacity,
        transform: [{ translateY: withInterpolate([100, 0]) }],
      };
    case 'fadeInUpBig':
      return {
        opacity: fadeInOpacity,
        transform: [{ translateY: withInterpolate([500, 0]) }],
      };
    case 'fadeInLeft':
      return {
        opacity: fadeInOpacity,
        transform: [{ translateX: withInterpolate([-100, 0]) }],
      };
    case 'fadeInLeftBig':
      return {
        opacity: fadeInOpacity,
        transform: [{ translateX: withInterpolate([-500, 0]) }],
      };
    case 'fadeInRight':
      return {
        opacity: fadeInOpacity,
        transform: [{ translateX: withInterpolate([100, 0]) }],
      };
    case 'fadeInRightBig':
      return {
        opacity: fadeInOpacity,
        transform: [{ translateX: withInterpolate([500, 0]) }],
      };
    // light speed
    case 'lightSpeedIn':
      return {
        opacity: withInterpolate([0, 1, 1, 1], [0, 0.6, 0.8, 1]),
        transform: [
          {
            translateX: withInterpolate([200, 0, 0, 0], [0, 0.6, 0.8, 1]),
          },
          {
            skewX: withInterpolate([-30, 20, -5, 0], [0, 0.6, 0.8, 1]) + 'deg',
          },
        ],
      };
    // slide
    case 'slideInDown':
      return {
        transform: [{ translateY: withInterpolate([-screenHeight, 0]) }],
      };
    case 'slideInUp':
      return {
        transform: [{ translateY: withInterpolate([screenHeight, 0]) }],
      };
    case 'slideInLeft':
      return {
        transform: [{ translateX: withInterpolate([-screenWidth, 0]) }],
      };
    case 'slideInRight':
      return {
        transform: [{ translateX: withInterpolate([screenWidth, 0]) }],
      };
    // zoom
    case 'zoomIn':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.5, 1]),
        transform: [{ scale: withInterpolate([0.3, 1]) }],
      };
    case 'zoomInDown':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.6, 1]),
        transform: [
          { scale: withInterpolate([0.1, 0.457, 1], [0, 0.6, 1]) },
          {
            translateY: withInterpolate([-1000, 60, 0], [0, 0.6, 1]),
          },
        ],
      };
    case 'zoomInUp':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.6, 1]),
        transform: [
          { scale: withInterpolate([0.1, 0.457, 1], [0, 0.6, 1]) },
          {
            translateY: withInterpolate([1000, -60, 0], [0, 0.6, 1]),
          },
        ],
      };
    case 'zoomInLeft':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.6, 1]),
        transform: [
          { scale: withInterpolate([0.1, 0.457, 1], [0, 0.6, 1]) },
          {
            translateX: withInterpolate([-1000, 10, 0], [0, 0.6, 1]),
          },
        ],
      };
    case 'zoomInRight':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.6, 1]),
        transform: [
          { scale: withInterpolate([0.1, 0.457, 1], [0, 0.6, 1]) },
          {
            translateX: withInterpolate([1000, -10, 0], [0, 0.6, 1]),
          },
        ],
      };
    // bounce
    case 'bounceIn':
      return {
        opacity: bounceInOpacity,
        transform: [
          {
            scale: withInterpolate(
              [0.3, 1.1, 0.9, 1.03, 1, 1],
              [0, 0.2, 0.4, 0.6, 0.8, 1],
            ),
          },
        ],
      };
    case 'bounceInUp':
      return {
        opacity: bounceInOpacity,
        transform: [
          {
            translateY: withInterpolate(
              [800, -25, 10, -5, 0],
              [0, 0.6, 0.75, 0.9, 1],
            ),
          },
        ],
      };
    case 'bounceInDown':
      return {
        opacity: bounceInOpacity,
        transform: [
          {
            translateY: withInterpolate(
              [-800, 25, -10, 5, 0],
              [0, 0.6, 0.75, 0.9, 1],
            ),
          },
        ],
      };
    case 'bounceInRight':
      return {
        opacity: bounceInOpacity,
        transform: [
          {
            translateX: withInterpolate(
              [600, -20, 8, -4, 0],
              [0, 0.6, 0.75, 0.9, 1],
            ),
          },
        ],
      };
    case 'bounceInLeft':
      return {
        opacity: bounceInOpacity,
        transform: [
          {
            translateX: withInterpolate(
              [-600, 20, -8, 4, 0],
              [0, 0.6, 0.75, 0.9, 1],
            ),
          },
        ],
      };
    case 'bounce':
      return {
        opacity: bounceInOpacity,
        transform: [
          {
            translateY: withInterpolate(
              [0, 0, -30, -30, 0, -15, 0, -4, 0],
              [0, 0.2, 0.4, 0.43, 0.53, 0.7, 0.8, 0.9, 1],
            ),
          },
        ],
      };
    case 'flash':
      return {
        opacity: withInterpolate([1, 0, 1, 0, 1], [0, 0.25, 0.5, 0.75, 1]),
      };
    case 'jello':
      return {
        transform: [
          {
            skewX:
              withInterpolate(
                [
                  0, 0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0.390625,
                  -0.1953125, 0,
                ],
                [0, 0.111, 0.222, 0.333, 0.444, 0.555, 0.666, 0.777, 0.888, 1],
              ) + 'deg',
          },
          {
            skewY:
              withInterpolate(
                [
                  0, 0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0.390625,
                  -0.1953125, 0,
                ],
                [0, 0.111, 0.222, 0.333, 0.444, 0.555, 0.666, 0.777, 0.888, 1],
              ) + 'deg',
          },
        ],
      };
    case 'pulse':
      return {
        transform: [{ scale: withInterpolate([1, 1.05, 1], [0, 0.5, 1]) }],
      };
    case 'rotate':
      return {
        opacity: withInterpolate([0, 1], [0, 0.2]),
        transform: [
          {
            rotate:
              withInterpolate([0, 90, 180, 270, 360], [0, 0.25, 0.5, 0.75, 1]) +
              'deg',
          },
        ],
      };
    case 'swing':
      return {
        opacity: withInterpolate([0, 1], [0, 0.2]),
        transform: [
          {
            rotate:
              withInterpolate(
                [0, 15, -10, 5, -5, 0],
                [0, 0.2, 0.4, 0.6, 0.8, 1],
              ) + 'deg',
          },
        ],
      };
    case 'rubberBand':
      return {
        opacity: withInterpolate([0, 1], [0, 0.1]),
        transform: [
          {
            scaleX: withInterpolate(
              [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
              [0, 0.3, 0.4, 0.5, 0.65, 0.75, 1],
            ),
          },
          {
            scaleY: withInterpolate(
              [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
              [0, 0.3, 0.4, 0.5, 0.65, 0.75, 1],
            ),
          },
        ],
      };
    case 'tada':
      return {
        opacity: withInterpolate([0, 1], [0, 0.2]),
        transform: [
          {
            scale: withInterpolate(
              [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
              [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            ),
          },
          {
            rotate:
              withInterpolate(
                [0, -3, -3, -3, 3, -3, 3, -3, 3, 3, 0],
                [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              ) + 'deg',
          },
        ],
      };
    case 'shake':
      return {
        transform: [
          {
            translateX: withInterpolate(
              [0, -10, 10, -10, 10, -10, 10, -10, 10, -10, 0],
              [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            ),
          },
        ],
      };
    case 'wobble':
      return {
        transform: [
          {
            rotate:
              withInterpolate(
                [0, -5, 3, -3, 2, -1, 0],
                [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
              ) + 'deg',
          },
          {
            translateX: withInterpolate(
              [0, -25, 20, -15, 10, -5, 0],
              [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
            ),
          },
        ],
      };
    default:
      return { opacity: fadeInOpacity };
  }
};

const withAnimatedOut = ({
  progress,
  screenHeight,
  typeOut,
  screenWidth,
}: AnimatedOption): ViewStyle => {
  'worklet';
  const withInterpolate = (
    outputRange: number[] = [0, 1],
    inputRange: number[] = [0, 1],
  ) => interpolate(progress.value, inputRange, outputRange);

  const fadeOutOpacity = withInterpolate([0, 1]);
  const bounceOutOpacity = withInterpolate([0, 1, 1], [0, 0.55, 1]);

  switch (typeOut) {
    // fade
    case 'fadeOut':
      return { opacity: fadeOutOpacity };
    case 'fadeOutDown':
      return {
        opacity: fadeOutOpacity,
        transform: [{ translateY: withInterpolate([100, 0]) }],
      };
    case 'fadeOutDownBig':
      return {
        opacity: fadeOutOpacity,
        transform: [{ translateY: withInterpolate([500, 0]) }],
      };
    case 'fadeOutUp':
      return {
        opacity: fadeOutOpacity,
        transform: [{ translateY: withInterpolate([-100, 0]) }],
      };
    case 'fadeOutUpBig':
      return {
        opacity: fadeOutOpacity,
        transform: [{ translateY: withInterpolate([-500, 0]) }],
      };
    case 'fadeOutLeft':
      return {
        opacity: fadeOutOpacity,
        transform: [{ translateX: withInterpolate([100, 0]) }],
      };
    case 'fadeOutLeftBig':
      return {
        opacity: fadeOutOpacity,
        transform: [{ translateX: withInterpolate([500, 0]) }],
      };
    case 'fadeOutRight':
      return {
        opacity: fadeOutOpacity,
        transform: [{ translateX: withInterpolate([-100, 0]) }],
      };
    case 'fadeOutRightBig':
      return {
        opacity: fadeOutOpacity,
        transform: [{ translateX: withInterpolate([-500, 0]) }],
      };
    // light speed
    case 'lightSpeedOut':
      return {
        opacity: withInterpolate([0, 1]),
        transform: [
          {
            translateX: withInterpolate([200, 0]),
          },
          {
            skewX: withInterpolate([30, 0]) + 'deg',
          },
        ],
      };
    // slide
    case 'slideOutDown':
      return {
        transform: [{ translateY: withInterpolate([screenHeight, 0]) }],
      };
    case 'slideOutUp':
      return {
        transform: [{ translateY: withInterpolate([-screenHeight, 0]) }],
      };
    case 'slideOutLeft':
      return {
        transform: [{ translateX: withInterpolate([-screenWidth, 0]) }],
      };
    case 'slideOutRight':
      return {
        transform: [{ translateX: withInterpolate([screenWidth, 0]) }],
      };
    // zoom
    case 'zoomOut':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.5, 1]),
        transform: [{ scale: withInterpolate([0.3, 1]) }],
      };
    case 'zoomOutUp':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.6, 1]),
        transform: [
          { scale: withInterpolate([0.1, 0.457, 1], [0, 0.6, 1]) },
          {
            translateY: withInterpolate([-1000, 60, 0], [0, 0.6, 1]),
          },
        ],
      };
    case 'zoomOutDown':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.6, 1]),
        transform: [
          { scale: withInterpolate([0.1, 0.457, 1], [0, 0.6, 1]) },
          {
            translateY: withInterpolate([1000, -60, 0], [0, 0.6, 1]),
          },
        ],
      };
    case 'zoomOutLeft':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.6, 1]),
        transform: [
          { scale: withInterpolate([0.1, 0.457, 1], [0, 0.6, 1]) },
          {
            translateX: withInterpolate([-1000, 10, 0], [0, 0.6, 1]),
          },
        ],
      };
    case 'zoomOutRight':
      return {
        opacity: withInterpolate([0, 1, 1], [0, 0.6, 1]),
        transform: [
          { scale: withInterpolate([0.1, 0.457, 1], [0, 0.6, 1]) },
          {
            translateX: withInterpolate([1000, -10, 0], [0, 0.6, 1]),
          },
        ],
      };
    // bounce
    case 'bounceOut':
      return {
        opacity: bounceOutOpacity,
        transform: [
          {
            scale: withInterpolate(
              [0.3, 1.11, 1.11, 0.9, 1],
              [0, 0.2, 0.5, 0.55, 1],
            ),
          },
        ],
      };
    case 'bounceOutUp':
      return {
        opacity: bounceOutOpacity,
        transform: [
          {
            translateY: withInterpolate(
              [-800, 20, 20, -10, 0],
              [0, 0.2, 0.4, 0.45, 1],
            ),
          },
        ],
      };
    case 'bounceOutDown':
      return {
        opacity: bounceOutOpacity,
        transform: [
          {
            translateY: withInterpolate(
              [800, -20, -20, 10, 0],
              [0, 0.2, 0.4, 0.45, 1],
            ),
          },
        ],
      };
    case 'bounceOutRight':
      return {
        opacity: bounceOutOpacity,
        transform: [
          {
            translateX: withInterpolate(
              [-600, 20, 20, -10, 0],
              [0, 0.2, 0.4, 0.45, 1],
            ),
          },
        ],
      };
    case 'bounceOutLeft':
      return {
        opacity: bounceOutOpacity,
        transform: [
          {
            translateX: withInterpolate(
              [600, -20, -20, 10, 0],
              [0, 0.2, 0.4, 0.45, 1],
            ),
          },
        ],
      };
    default:
      return { opacity: fadeOutOpacity };
  }
};

export const withAnimated = (data: AnimatedOption) => {
  'worklet';
  if (data.isOut.value) {
    return withAnimatedOut(data);
  }
  return withAnimatedIn(data);
};
