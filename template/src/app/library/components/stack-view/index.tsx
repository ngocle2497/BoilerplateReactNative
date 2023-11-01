/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';

import Animated from 'react-native-reanimated';

import { StackViewProps } from './type';

export const StackView = forwardRef(
  ({ children, ...rest }: StackViewProps, ref: any) => {
    // render
    return (
      <Animated.ScrollView
        ref={ref as any}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        {...rest}>
        {children}
      </Animated.ScrollView>
    );
  },
);
