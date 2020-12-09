import React, { useMemo, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../Text/Text';
import { stylesView, stylesText } from './Button.presets';
import { ButtonProps } from './Button.props';
import { enhance } from '@common';
import equals from 'react-fast-compare';

const ButtonComponent = (props: ButtonProps) => {
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    ...rest
  } = props;

  const viewStyle = useMemo(
    () => enhance([stylesView[preset], styleOverride]),
    [styleOverride],
  );
  const textStyle = useMemo(
    () => enhance([stylesText[preset], textStyleOverride]),
    [styleOverride],
  );

  const content = useMemo(
    () => children || <Text tx={tx} text={text} style={textStyle} />,
    [tx, textStyle, children, text],
  );

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  );
};
export const Button = memo(ButtonComponent, equals);
