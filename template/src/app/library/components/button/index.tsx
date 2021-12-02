import {enhance} from '@common';
import {useTheme} from '@theme';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {TouchableOpacity, ViewStyle} from 'react-native';

import {Text} from '../text';

import {stylesView} from './preset';
import {ButtonProps} from './type';

const ButtonComponent = (props: ButtonProps) => {
  // state
  const {
    preset = 'default',
    textPreset = 'default',
    textColor,
    textColorTheme,
    tx,
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
  const viewStyle = useMemo(
    () =>
      enhance<ViewStyle>([
        stylesView[preset],
        {
          backgroundColor: buttonColorTheme
            ? theme.colors[buttonColorTheme]
            : buttonColor,
        },

        styleOverride as ViewStyle,
      ]),
    [buttonColor, buttonColorTheme, preset, styleOverride, theme.colors],
  );

  const content = useMemo(
    () =>
      children || (
        <Text
          tx={tx}
          text={text}
          style={textStyleOverride}
          preset={textPreset}
          color={textColor}
          colorTheme={textColorTheme}
        />
      ),
    [
      children,
      tx,
      text,
      textStyleOverride,
      textPreset,
      textColor,
      textColorTheme,
    ],
  );

  // render
  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  );
};
export const Button = memo(ButtonComponent, equals);
