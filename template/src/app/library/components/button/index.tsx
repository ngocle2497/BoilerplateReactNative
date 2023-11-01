import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useThrottle } from './hook';
import { ButtonProps } from './type';

export const Button = (props: ButtonProps) => {
  // state
  const {
    children,
    throttleMs,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    ...rest
  } = props;

  const [, handlePress, handleLongPress, handlePressIn, handlePressOut] =
    useThrottle({
      throttleMs,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
    });

  // render
  return (
    <TouchableOpacity
      {...rest}
      onLongPress={handleLongPress}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      {children}
    </TouchableOpacity>
  );
};
