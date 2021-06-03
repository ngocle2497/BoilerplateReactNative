import React, {
  forwardRef,
  ComponentType,
  FunctionComponent,
  useRef,
  useEffect,
  memo,
} from 'react';
import type {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import type {
  InternalControllerState,
  TransitionProps,
  UseAnimationState,
  UseAnimationStateConfig,
  Variants,
} from './types';
import useMapAnimateToStyle from './useAnimatedToStyle';
import Animated, {useSharedValue} from 'react-native-reanimated';

function createAnimatedComponent<
  Style,
  Props extends {style?: Style},
  Ref,
  ExtraProps,
  Animate = ViewStyle | ImageStyle | TextStyle,
>(ComponentWithoutAnimation: ComponentType<Props>) {
  const Component = Animated.createAnimatedComponent(
    ComponentWithoutAnimation as FunctionComponent<Props>,
  );

  const withAnimations = () =>
    //  we might use these later
    // outerProps?: ExtraProps
    {
      const AnimateComponent = forwardRef<
        Ref,
        Props &
          TransitionProps<Animate> &
          ExtraProps & {
            children?: React.ReactNode;
          }
      >(function Animate(
        {
          animate,
          style,
          from = false as const,
          transition,
          delay,
          state,
          stylePriority,
          onDidAnimate,
          animateInitialState,
          ...props
        },
        ref,
      ) {
        const animated = useMapAnimateToStyle({
          animate,
          from,
          transition,
          delay,
          state,
          stylePriority,
          onDidAnimate,
          animateInitialState,
        });

        return (
          <Component
            {...(props as any)} // TODO
            style={[style, animated.style]}
            ref={ref as any} // TODO
          />
        );
      });

      return AnimateComponent;
    };

  return withAnimations;
}

import {
  View as RView,
  Text as RText,
  Image as RImage,
  ScrollView as RScrollView,
  SafeAreaView as RSafeAreaView,
} from 'react-native';
import isEqual from 'react-fast-compare';

const View = memo(createAnimatedComponent(RView)(), isEqual);
const Text = memo(createAnimatedComponent(RText)(), isEqual);
const Image = memo(createAnimatedComponent(RImage)(), isEqual);
const ScrollView = memo(createAnimatedComponent(RScrollView)(), isEqual);
const SafeAreaView = memo(createAnimatedComponent(RSafeAreaView)(), isEqual);

export const Transition = {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
};
export function useAnimationState<V extends Variants<V>>(
  _variants: V,
  {
    from = 'from' as keyof V,
    to = 'to' as keyof V,
  }: UseAnimationStateConfig<V> = {},
) {
  const controller = useRef<UseAnimationState<V>>();
  const __state = useSharedValue<InternalControllerState<V>>(
    from ? _variants[from] : 0,
  );

  const selectedVariant = useRef(from);
  const variants = useRef(_variants);

  useEffect(
    function updateVariantsRef() {
      // honestly, I'm not sure if this should happen
      // do we want these to rebuild?
      // probably not, because it gives the illusion that you can change them on the fly
      // that said, as long as you know you can only change them with transitionTo,
      // I think it's fine.
      variants.current = _variants;
    },
    [_variants],
  );

  if (controller.current == null) {
    controller.current = {
      __state,
      transitionTo(nextStateOrFunction) {
        const runTransition = (nextStateKey: keyof V) => {
          selectedVariant.current = nextStateKey;

          const value = variants.current[nextStateKey];

          if (value) __state.value = value as any;
        };

        if (typeof nextStateOrFunction === 'function') {
          // similar to setState, let people compose a function that takes in the current value and returns the next one
          runTransition(nextStateOrFunction(this.current as keyof V));
        } else {
          runTransition(nextStateOrFunction);
        }
      },
      get current(): keyof V {
        return selectedVariant.current;
      },
    };
  }

  useEffect(
    function maybeTransitionOnMount() {
      if (variants.current[to]) {
        if (variants.current[from]) {
          controller.current?.transitionTo(to);
        }
      }
    },
    [from, to],
  );

  return controller.current as UseAnimationState<V>;
}
