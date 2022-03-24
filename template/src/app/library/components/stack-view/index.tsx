import React, { forwardRef, memo } from 'react';

import isEqual from 'react-fast-compare';
import Animated from 'react-native-reanimated';

import { StackViewProps } from './type';

const StackViewComponent = forwardRef(
  (
    { children, ...rest }: StackViewProps,
    ref: React.ForwardedRef<Animated.ScrollView>,
  ) => {
    // render
    return (
      <Animated.ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        {...rest}>
        {children}
      </Animated.ScrollView>
    );
  },
);

export const StackView = memo(StackViewComponent, isEqual);
