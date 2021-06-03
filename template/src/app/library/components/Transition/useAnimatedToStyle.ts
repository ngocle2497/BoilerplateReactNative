import {useCallback, useEffect} from 'react';
import type {TransformsStyle} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Transforms, TransitionConfig, TransitionProps} from './types';

const isColor = (styleKey: string) => {
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
  ].includes(styleKey);
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

function animationDelay<Animate>(
  key: string,
  transition: TransitionProps<Animate>['transition'],
  defaultDelay?: number,
) {
  'worklet';
  let delayMs: TransitionConfig['delay'] = defaultDelay;

  if ((transition as any)?.[key as keyof Animate]?.delay != null) {
    delayMs = (transition as any)?.[key as keyof Animate]?.delay;
  } else if (transition?.delay != null) {
    delayMs = transition.delay;
  }

  return {
    delayMs,
  };
}

function animationConfig<Animate>(
  styleProp: string,
  transition: TransitionProps<Animate>['transition'],
) {
  'worklet';

  const key = styleProp;
  let repeatCount = 0;
  let repeatReverse = true;

  let animationType: Required<TransitionConfig>['type'] = 'spring';
  if (isColor(key) || key === 'opacity') animationType = 'timing';

  // say that we're looking at `width`
  // first, check if we have transition.width.type
  if ((transition as any)?.[key as keyof Animate]?.type) {
    animationType = (transition as any)[key]?.type;
  } else if (transition?.type) {
    // otherwise, fallback to transition.type
    animationType = transition.type;
  }

  const loop =
    (transition as any)?.[key as keyof Animate]?.loop ?? transition?.loop;

  if (loop != null) {
    repeatCount = loop ? -1 : 0;
  }

  if ((transition as any)?.[key as keyof Animate]?.repeat != null) {
    repeatCount = (transition as any)?.[key as keyof Animate]?.repeat;
  } else if (transition?.repeat != null) {
    repeatCount = transition.repeat;
  }

  if ((transition as any)?.[key as keyof Animate]?.repeatReverse != null) {
    repeatReverse = (transition as any)?.[key as keyof Animate]?.repeatReverse;
  } else if (transition?.repeatReverse != null) {
    repeatReverse = transition.repeatReverse;
  }

  let config = {} as any;
  // so sad, but fix it later :(
  let animation = (...props: any): any => props;

  if (animationType === 'timing') {
    const duration =
      ((transition as any)?.[key as keyof Animate] as Animated.WithTimingConfig)
        ?.duration ?? (transition as Animated.WithTimingConfig)?.duration;

    const easing =
      ((transition as any)?.[key as keyof Animate] as Animated.WithTimingConfig)
        ?.easing ?? (transition as Animated.WithTimingConfig)?.easing;

    if (easing) {
      config['easing'] = easing;
    }
    if (duration != null) {
      config['duration'] = duration;
    }
    animation = withTiming;
  } else if (animationType === 'spring') {
    animation = withSpring;
    config = {
      // solve the missing velocity bug in 2.0.0-rc.0
      // velocity: 2,
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
    configKeys.forEach(configKey => {
      'worklet';
      const styleSpecificConfig = transition?.[key]?.[configKey];
      const transitionConfigForKey = transition?.[configKey];

      if (styleSpecificConfig != null) {
        config[configKey] = styleSpecificConfig;
      } else if (transitionConfigForKey != null) {
        config[configKey] = transitionConfigForKey;
      }
    });
  }

  return {
    animation,
    config,
    repeatReverse,
    repeatCount,
    shouldRepeat: !!repeatCount,
  };
}

export default function useMapAnimateToStyle<Animate>({
  animate,
  from = false,
  transition: transitionProp,
  delay: defaultDelay,
  state,
  stylePriority = 'animate',
  onDidAnimate,
  animateInitialState = false,
}: TransitionProps<Animate>) {
  const isMounted = useSharedValue(false);

  const reanimatedOnDidAnimated = useCallback<NonNullable<typeof onDidAnimate>>(
    (...args: any) => {
      onDidAnimate?.(...args);
    },
    [onDidAnimate],
  );

  const style = useAnimatedStyle(() => {
    const final = {
      // initializing here fixes reanimated object.__defineProperty bug(?)
      transform: [] as TransformsStyle['transform'],
    } as any;
    const variantStyle: Animate = state?.__state?.value || {};

    const animateStyle = animate || {};
    const initialStyle = from || {};

    let mergedStyles: any = {} as any;
    if (stylePriority === 'state') {
      mergedStyles = Object.assign({}, animateStyle, variantStyle);
    } else {
      mergedStyles = Object.assign({}, variantStyle, animateStyle);
    }

    // use forEach instead!

    let transition = transitionProp;
    Object.keys(mergedStyles).forEach(key => {
      const initialValue = initialStyle[key];
      const value = mergedStyles[key];

      const {animation, config, shouldRepeat, repeatCount, repeatReverse} =
        animationConfig(key, transition);

      const callback: (completed: boolean, value?: any) => void = (
        completed,
        recentValue,
      ) => {
        if (onDidAnimate) {
          runOnJS(reanimatedOnDidAnimated)(key as any, completed, recentValue, {
            attempedValue: value,
          });
        }
      };

      if (initialValue != null) {
        // if we haven't mounted, or if there's no other value to use besides the initial one, use it.
        if (isMounted.value === false || value == null) {
          if (isTransform(key) && final.transform) {
            const transform = {} as Transforms;
            if (isMounted.value || animateInitialState) {
              transform[key] = animation(initialValue, config);
            } else {
              transform[key] = initialValue;
            }

            // final.transform.push({ [key]: initialValue }) does not work!
            final.transform.push(transform);
          } else {
            if (isMounted.value || animateInitialState) {
              final[key] = animation(initialValue, config);
            } else {
              final[key] = initialValue;
            }
          }
          return;
        }
      }

      let {delayMs} = animationDelay(key, transition, defaultDelay);
      if (value == null || value === false) {
        return;
      }
      if (Array.isArray(value)) {
        const sequence = value
          .filter(step => {
            // remove null, false values to allow for conditional styles
            if (typeof step === 'object') {
              return step?.value != null && step?.value !== false;
            }
            return step != null && step !== false;
          })
          .map(step => {
            let stepDelay = delayMs;
            let stepValue = step;
            let stepConfig = Object.assign({}, config);
            let stepAnimation = animation;
            if (typeof step === 'object') {
              // not allowed in Reanimated: { delay, value, ...transition } = step
              const transition = Object.assign({}, step);
              delete transition.delay;
              delete transition.value;

              const {config: inlineStepConfig, animation} = animationConfig(
                key,
                transition,
              );

              stepConfig = Object.assign({}, stepConfig, inlineStepConfig);
              stepAnimation = animation;

              if (step.delay != null) {
                stepDelay = step.delay;
              }
              stepValue = step.value;
            }

            const sequenceValue = stepAnimation(
              stepValue,
              stepConfig,
              callback,
            );
            if (stepDelay != null) {
              return withDelay(stepDelay, sequenceValue);
            }
            return sequenceValue;
          })
          .filter(Boolean);

        if (isTransform(key)) {
          // we have a sequence of transforms
          final['transform'] = final['transform'] || [];

          if (sequence.length) {
            const transform = {} as any;

            transform[key] = withSequence(sequence[0], ...sequence.slice(1));

            // @ts-ignore
            final['transform'].push(transform);
          }
        } else {
          // we have a normal sequence of items
          // shadows not supported
          if (sequence.length) {
            final[key] = withSequence(sequence[0], ...sequence.slice(1));
          }
        }
      } else if (isTransform(key)) {
        final['transform'] = final['transform'] || [];
        // const transformKey = Object.keys(transformProp)[0]
        // const transformValue = transformProp[transformKey]

        if (transition?.[key]?.delay != null) {
          delayMs = transition?.[key]?.delay;
        }

        const transform = {} as any;
        let finalValue = animation(value, config, callback);
        if (shouldRepeat) {
          finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
        }
        if (delayMs != null) {
          transform[key] = withDelay(delayMs, finalValue);
        } else {
          transform[key] = finalValue;
        }

        // @ts-ignore
        final['transform'].push(transform);
      } else if (typeof value === 'object') {
        // shadows
        final[key] = {};
        Object.keys(value || {}).forEach(innerStyleKey => {
          let finalValue = animation(value, config, callback);

          if (shouldRepeat) {
            finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
          }

          if (delayMs != null) {
            final[key][innerStyleKey] = withDelay(delayMs, finalValue);
          } else {
            final[key][innerStyleKey] = finalValue;
          }
        });
      } else {
        let finalValue = animation(value, config, callback);
        if (shouldRepeat) {
          finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
        }

        if (delayMs != null && typeof delayMs === 'number') {
          final[key] = withDelay(delayMs, finalValue);
        } else {
          final[key] = finalValue;
        }
      }
    });

    return final;
  });

  useEffect(() => {
    isMounted.value = true;
  }, [isMounted]);

  return {
    style,
  };
}
