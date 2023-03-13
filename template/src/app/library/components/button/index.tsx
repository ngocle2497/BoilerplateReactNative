import React, { useMemo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { useTheme } from '@theme';

import { stylesText, stylesView } from './preset';
import { ButtonProps } from './type';

import { Text } from '../text';

export const Button = (props: ButtonProps) => {
  // state
  const {
    text,
    t18n,
    children,
    textColor,
    buttonColor,
    textColorTheme,
    buttonColorTheme,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    preset = 'default',
    ...rest
  } = props;

  const theme = useTheme();

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
      {...rest}>
      {children || (
        <Text
          t18n={t18n}
          text={text}
          style={[stylesText[preset], textStyleOverride]}
          color={textColor}
          colorTheme={textColorTheme}
        />
      )}
    </TouchableOpacity>
  );
};
