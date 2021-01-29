import React, {forwardRef, memo} from "react";
import isEqual from "react-fast-compare";
import {ScrollView} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import {StackViewProps} from "./StackView.props";

const StackViewAnimated = Animated.createAnimatedComponent(ScrollView);

const StackViewComponent = forwardRef(
  (
    {children, ...rest}: StackViewProps,
    ref: React.ForwardedRef<ScrollView>,
  ) => {
    return (
      <StackViewAnimated
        ref={ref}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        {...rest}>
        {children}
      </StackViewAnimated>
    );
  },
);

export const StackView = memo(StackViewComponent, isEqual);
