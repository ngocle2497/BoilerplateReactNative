import React, { useMemo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { useTheme } from '@theme';

import { useThrottle } from './hook';
import { stylesView } from './preset';
import { ButtonProps } from './type';

export const Button = (props: ButtonProps) => {
  // state
  const {
    children,
    throttleMs,
    buttonColor,
    buttonColorTheme,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    style: styleOverride = {},
    preset = 'default',
    ...rest
  } = props;

  const theme = useTheme();

  const [, handlePress, handleLongPress, handlePressIn, handlePressOut] =
    useThrottle({
      throttleMs,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
    });

  // style
  const viewStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: buttonColorTheme
          ? theme.colors[buttonColorTheme]
          : buttonColor,
      },
    ],
    [buttonColor, buttonColorTheme, theme.colors],
  );

  // render
  return (
    <TouchableOpacity
      style={[stylesView[preset], viewStyle, styleOverride]}
      {...rest}
      onLongPress={handleLongPress}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      {children}
    </TouchableOpacity>
  );
};
