import React, { useCallback } from 'react';
import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { sharedTiming } from '@animated';
import { onCheckType } from '@common';

import { styles } from './styles';
import { TouchableScaleProps } from './type';

export const TouchableScale = (props: TouchableScaleProps) => {
  // props
  const {
    children,
    onPressIn,
    onPressOut,
    minScale = 0.9,
    containerStyle: overwriteContainerStyle,
    ...rest
  } = props;

  // reanimated
  const scale = useSharedValue(1);

  // function
  const _onPressIn = useCallback(
    (e: GestureResponderEvent) => {
      scale.value = sharedTiming(minScale, { duration: 150 });

      if (onCheckType(onPressIn, 'function')) {
        onPressIn(e);
      }
    },
    [minScale, onPressIn, scale],
  );

  const _onPressOut = useCallback(
    (e: GestureResponderEvent) => {
      scale.value = sharedTiming(1, { duration: 150 });

      if (onCheckType(onPressOut, 'function')) {
        onPressOut(e);
      }
    },
    [onPressOut, scale],
  );

  //reanimated style
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // render
  return (
    <TouchableWithoutFeedback
      {...rest}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}>
      <Animated.View
        style={[
          styles.container,
          overwriteContainerStyle,
          containerAnimatedStyle,
        ]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
