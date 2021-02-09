import React, {ComponentType, forwardRef} from 'react';
import Animated from 'react-native-reanimated';
import {View as RNView, Text as RNText, Image as RNImage} from 'react-native';

import {useMapAnimateToStyle} from './mapAnimateToStyle';
import {ImageStyle, ModifyProps, TextStyle, ViewStyle} from './types';

function modify<
  Style,
  Props extends {style?: Style},
  Ref,
  ExtraProps,
  Animate = ViewStyle | ImageStyle | TextStyle
>(ComponentWithoutAnimation: ComponentType<any>) {
  const Component = Animated.createAnimatedComponent(ComponentWithoutAnimation);

  const withAnimations = () => {
    const withStyles = forwardRef<
      Ref,
      Props &
        ModifyProps<Animate> &
        ExtraProps & {
          children?: React.ReactNode;
        }
    >(function Wrapped(
      {animate, style, start, transition, delay, exit, ...props},
      ref,
    ) {
      const animated = useMapAnimateToStyle({
        animate,
        start,
        transition,
        delay,
        exit,
      });

      return (
        <Component
          {...(props as Props)}
          style={[style, animated.style]}
          ref={ref}
        />
      );
    });

    return withStyles;
  };

  return withAnimations;
}
export const ReModifyView = modify(RNView)();
export const ReModifyText = modify(RNText)();
export const ReModifyImage = modify(RNImage)();
