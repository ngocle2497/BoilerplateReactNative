import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useThrottle } from './hook';
import { ButtonProps } from './type';

export const DefaultButton = ({
  throttleMs,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  children,
  ...rest
}: TouchableOpacityProps & Pick<ButtonProps, 'throttleMs'>) => {
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
