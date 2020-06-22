import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../Text/Text';
import {stylesView, stylesText} from './Button.presets';
import {ButtonProps} from './Button.props';
import {enhance} from '@common';
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

  const viewStyle = React.useMemo(
    () => enhance([stylesView[preset], styleOverride]),
    [styleOverride],
  );
  const textStyle = React.useMemo(
    () => enhance([stylesText[preset], textStyleOverride]),
    [styleOverride],
  );

  const content = children || <Text tx={tx} text={text} style={textStyle} />;

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  );
};
export const Button = React.memo(ButtonComponent, (prevProps, nextProps) =>
  equals(prevProps, nextProps),
);
