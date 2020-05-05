import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../Text/Text';
import { stylesView, stylesText } from './Button.presets';
import { ButtonProps } from './Button.props';
import { mergeAll, flatten, equals } from 'ramda';

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

  const viewStyle = mergeAll(
    flatten([stylesView()[preset] || stylesView().primary, styleOverride]),
  );
  const textStyle = mergeAll(
    flatten([stylesText()[preset] || stylesText().primary, textStyleOverride]),
  );

  const content = children || <Text tx={tx} text={text} style={textStyle} />;

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  )
}
export const Button = React.memo(ButtonComponent, (prevProps, nextProps) => equals(prevProps, nextProps))