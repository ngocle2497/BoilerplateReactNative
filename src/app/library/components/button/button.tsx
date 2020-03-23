import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../';
import { stylesView, stylesText } from './button.presets';
import { ButtonProps } from './button.props';
import { mergeAll, flatten } from 'ramda';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
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
  const dependencyList = [viewStyle,textStyle,...dependency]
  return React.useMemo(() => (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  ), dependencyList)
}
