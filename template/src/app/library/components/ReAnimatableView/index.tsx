import React, {forwardRef, memo} from 'react';
import Animated from 'react-native-reanimated';
import {View as RNView, ViewProps} from 'react-native';
import isEqual from 'react-fast-compare';

import {useMapAnimateToStyle} from './mapAnimateToStyle';
import {ReAnimatableProps, ViewStyle} from './types';

const ReanimatedComponent = Animated.createAnimatedComponent(RNView);
function modify<
  Style,
  Props extends {style?: Style},
  Ref,
  ExtraProps,
  Animate = ViewStyle
>() {
  const withAnimations = () => {
    const withStyles = forwardRef<
      Ref,
      Props &
        ReAnimatableProps<Animate> &
        ExtraProps & {
          children?: React.ReactNode;
        } & ViewProps
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
        <ReanimatedComponent
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
export const ReAnimatableView = memo(modify()(), isEqual);
