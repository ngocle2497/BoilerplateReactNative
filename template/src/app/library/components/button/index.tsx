import React, { memo, useMemo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import equals from 'react-fast-compare';

import { useTheme } from '@theme';

import { stylesText, stylesView } from './preset';
import { ButtonProps } from './type';

import { Text } from '../text';

const ButtonComponent = (props: ButtonProps) => {
  // state
  const {
    preset = 'default',
    textColor,
    textColorTheme,
    t18n,
    text,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    buttonColor,
    buttonColorTheme,
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
export const Button = memo(ButtonComponent, equals);
