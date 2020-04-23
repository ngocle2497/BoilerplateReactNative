import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '..';
import { stylesView, stylesText } from './Button.presets';
import { ButtonProps } from './Button.props';
import { mergeAll, flatten } from 'ramda';

export function Button(props: ButtonProps) {
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    dependency = [],
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([stylesView()[preset] || stylesView().primary, styleOverride]),
  );
  const textStyle = mergeAll(
    flatten([stylesText()[preset] || stylesText().primary, textStyleOverride]),
  );

  const content = children || <Text tx={tx} text={text} style={textStyle} />;
  const dependencyList = [viewStyle, textStyle, ...dependency]
  return React.useMemo(() => (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  ), dependencyList)
}
