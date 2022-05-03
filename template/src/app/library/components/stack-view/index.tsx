import React, { forwardRef } from 'react';

import Animated from 'react-native-reanimated';

import { StackViewProps } from './type';

export const StackView = forwardRef(
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
