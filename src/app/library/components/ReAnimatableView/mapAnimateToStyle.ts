/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useMemo} from 'react';
import {TransformsStyle} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {usePresence} from '../Presence/usePresence';

import {
  ReAnimatableProps,
  Transforms,
  ModifyTransitionProps,
  TransitionConfig,
} from './types';

const isColor = (key: string) => {
  'worklet';
  return [
    'backgroundColor',
    'borderBottomColor',
    'borderColor',
    'borderEndColor',
    'borderLeftColor',
    'borderRightColor',
    'borderStartColor',
    'borderTopColor',
    'color',
  ].includes(key);
};
const isTransform = (styleKey: string) => {
  'worklet';
  const transforms: (keyof Transforms)[] = [
    'perspective',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'scale',
    'scaleX',
    'scaleY',
    'translateX',
    'translateY',
    'skewX',
    'skewY',
  ];
  return transforms.includes(styleKey as keyof Transforms);
};

function animatedDelay<Animate>(
  key: string,
  transition: ModifyTransitionProps<Animate>,
  defaultDelay?: number,
) {
  'worklet';
  let delayMs: TransitionConfig['delay'] = defaultDelay;
  const transitionAny = transition as any;
  if (transitionAny?.[key as keyof Animate]?.delay != null) {
    delayMs = transitionAny?.[key as keyof Animate]?.delay;
  } else if (transition?.delay != null) {
    delayMs = transition.delay;
  }

  return {
    delayMs,
  };
}

function animatedConfig<Animate>(
  style: string,
  transition: ModifyTransitionProps<Animate>,
) {
  'worklet';
  let repeatCount = 0;
  let repeatReverse = true;
  let animationType: Required<TransitionConfig>['type'] = 'timing';
  const transitionAny = transition as any;

  const key = style as keyof Animate;

  if (isColor(key as string) || key === 'opacity') {
    animationType = 'timing';
  }
  // check type transition
  if (transitionAny?.[key]?.type) {
    animationType = transitionAny[key]?.type;
  } else if (transition?.type) {
    // otherwise, fallback to transition.type
    animationType = transition.type;
  }

  // check loop
  if (transitionAny?.[key]?.loop) {
    repeatCount = Infinity;
  } else if (transition?.loop) {
    repeatCount = Infinity;
  }

  // check repeat
  if (transitionAny?.[key]?.repeat != null) {
    repeatCount = transitionAny?.[key]?.repeat;
  } else if (transition?.repeat) {
    repeatCount = transition.repeat;
  }

  // check reverse
  if (transitionAny?.[key]?.repeatReverse != null) {
    repeatReverse = transitionAny?.[key]?.repeatReverse;
  } else if (transition?.repeatReverse) {
    repeatReverse = transitionAny.repeatReverse ?? true;
  }
  let config = {} as any;
  let animation:
    | typeof Animated.withDecay
    | typeof Animated.withSpring
    | typeof Animated.withTiming = withTiming;
  switch (animationType) {
    case 'timing': {
      const duration =
        (transitionAny?.[key] as Animated.WithTimingConfig)?.duration ??
        (transition as Animated.WithTimingConfig)?.duration;

      const easing =
        (transitionAny?.[key] as Animated.WithTimingConfig)?.easing ??
        (transition as Animated.WithTimingConfig)?.easing;

      if (easing) {
        config.easing = easing;
      }
      if (duration != null) {
        config.duration = duration;
      }
      break;
    }
    case 'spring': {
      animation = withSpring;
      config = {
        // solve the missing velocity bug in 2.0.0-rc.0
        velocity: 2,
      } as Animated.WithSpringConfig;
      const configKeys: (keyof Animated.WithSpringConfig)[] = [
        'damping',
        'mass',
        'overshootClamping',
        'restDisplacementThreshold',
        'restSpeedThreshold',
        'stiffness',
        'velocity',
      ];
      configKeys.forEach((configKey) => {
        'worklet';
        const styleSpecificConfig = transitionAny?.[key]?.[configKey];
        const transitionConfigForKey = transitionAny?.[configKey];

        if (styleSpecificConfig != null) {
          config[configKey] = styleSpecificConfig;
        } else if (transitionConfigForKey != null) {
          config[configKey] = transitionConfigForKey;
        }
      });
      break;
    }
    case 'decay': {
      animation = withDecay;
      config = {} as Animated.WithDecayConfig;
      const configKeys: (keyof Animated.WithDecayConfig)[] = [
        'clamp',
        'velocity',
        'deceleration',
      ];
      configKeys.forEach((configKey) => {
        'worklet';
        const styleSpecificConfig = transitionAny?.[key]?.[configKey];
        const transitionConfigForKey = transitionAny?.[configKey];

        if (styleSpecificConfig != null) {
          config[configKey] = styleSpecificConfig;
        } else if (transitionConfigForKey != null) {
          config[configKey] = transitionConfigForKey;
        }
      });
      break;
    }
    default:
      break;
  }
  return {
    animation,
    config,
    repeatReverse,
    repeatCount,
    shouldRepeat: !!repeatCount,
    animationType,
  };
}

function handleAnimated(
  type: Required<TransitionConfig>['type'],
  animation:
    | typeof Animated.withDecay
    | typeof Animated.withSpring
    | typeof Animated.withTiming,
  toValue: number,
  config: any,
  callback?: (finished: boolean) => void,
) {
  'worklet';
  switch (type) {
    case 'spring':
    case 'timing':
      return animation(toValue, config, callback);
    case 'decay':
      return animation(config, callback);
  }
}
export function useMapAnimateToStyle<Animate>({
  start,
  animate,
  delay: defaultDelay,
  transition,
  exit,
  onDidAnimate,
}: ReAnimatableProps<Animate>) {
  const isMounted = useSharedValue(false);
  const [isPresent, safeToUnMount] = usePresence();
  const initialStyle = useMemo(() => (start ?? {}) as any, [start]);
  const animateStyle = useMemo(() => (animate ?? {}) as any, [animate]);
  const exitStyle = useMemo(() => (exit ?? {}) as any, [exit]);

  const hasExitStyle = useMemo(() => Object.keys(exitStyle).length > 0, [
    exitStyle,
  ]);
  const isExiting = useMemo(() => !isPresent && hasExitStyle, [
    hasExitStyle,
    isPresent,
  ]);
  const style = useAnimatedStyle(() => {
    const actualStyle = {
      transform: [] as TransformsStyle['transform'],
    } as any;
    let mergedStyles = animateStyle;
    if (isExiting) {
      mergedStyles = exitStyle;
    }
    Object.keys(mergedStyles).forEach((key, index) => {
      'worklet';
      const initialValue = initialStyle[key];
      const value = mergedStyles[key];
      const {
        animation,
        config,
        shouldRepeat,
        repeatCount,
        repeatReverse,
        animationType,
      } = animatedConfig(key, transition);

      const callback: (finished: boolean) => void = (finished: boolean) => {
        if (onDidAnimate) {
          runOnJS(onDidAnimate)(finished, key);
        }
        if (isExiting) {
          const isLastStyleKeyToAnimate =
            index + 1 === Object.keys(mergedStyles).length;
          if (isLastStyleKeyToAnimate && safeToUnMount) {
            runOnJS(safeToUnMount)();
          }
        }
      };
      if (isMounted.value === false) {
        // before mount, the view need to a initial style
        if (isTransform(key)) {
          const transform = {} as any;
          if (key.startsWith('rotate') || key.startsWith('skew')) {
            transform[key] = (initialValue * Math.PI) / 180;
          } else {
            transform[key] = initialValue;
          }
          actualStyle.transform.push(transform);
        } else {
          actualStyle[key] = initialValue;
        }
        return;
      }
      let {delayMs} = animatedDelay(key, transition, defaultDelay);
      if (value == null || value === false) {
        return;
      }
      if (isTransform(key)) {
        actualStyle.transform = actualStyle.transform || [];

        if (transition?.[key as keyof Transforms]?.delay != null) {
          delayMs = transition?.[key as keyof Transforms]?.delay;
        }

        const transform = {} as any;
        let finalValue = handleAnimated(
          animationType,
          animation,
          key.startsWith('rotate') || key.startsWith('skew')
            ? (value * Math.PI) / 180
            : value,
          config,
          callback,
        );

        if (shouldRepeat) {
          finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
        }

        if (delayMs != null) {
          transform[key] = withDelay(delayMs, finalValue);
        } else {
          transform[key] = finalValue;
        }
        actualStyle.transform.push(transform);
      } else if (typeof value === 'object') {
        // shadows
        actualStyle[key] = {};
        Object.keys(value).forEach((innerStyleKey) => {
          let finalValue = handleAnimated(
            animationType,
            animation,
            value[innerStyleKey],
            config,
            callback,
          );

          if (shouldRepeat) {
            finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
          }

          if (delayMs != null) {
            actualStyle[key][innerStyleKey] = withDelay(delayMs, finalValue);
          } else {
            actualStyle[key][innerStyleKey] = finalValue;
          }
        });
      } else {
        let finalValue = handleAnimated(
          animationType,
          animation,
          value,
          config,
          callback,
        );
        if (shouldRepeat) {
          finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
        }

        if (typeof delayMs === 'number') {
          actualStyle[key] = withDelay(delayMs, finalValue);
        } else {
          actualStyle[key] = finalValue;
        }
      }
    });
    return actualStyle;
  });
  useEffect(() => {
    // Must push to queue to update isMounted after all function
    const id = setTimeout(() => {
      isMounted.value = true;
    }, 40);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!isPresent && !hasExitStyle) {
      safeToUnMount?.();
    }
  }, [hasExitStyle, isPresent, safeToUnMount]);
  return {style};
}
