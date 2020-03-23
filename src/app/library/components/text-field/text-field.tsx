import * as React from 'react';
import { View, TextInput, TextStyle, ViewStyle } from 'react-native';
import { translate } from '../../utils/i18n/translate';
import { Text } from '../';
import { TextFieldProps } from './text-field.props';
import { mergeAll, flatten } from 'ramda';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../../../config/type';

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: 12,
  width:'100%'
};

// the base styling for the TextInput
const INPUT: TextStyle = {
  color: 'rgb(28, 28, 30)',
  minHeight: 44,
  fontSize: 18,
  backgroundColor: '#FFFFFF',
};

const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

export const TextField: React.FunctionComponent<TextFieldProps> = props => {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props;
  const theme: AppTheme = useTheme();
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] };
  containerStyle = enhance(containerStyle, styleOverride);

  let inputStyle: TextStyle = INPUT;
  inputStyle = enhance(inputStyle, inputStyleOverride);
  const actualPlaceholder = placeholderTx
    ? translate(placeholderTx)
    : placeholder;

  return (
    <View style={containerStyle}>
      <Text preset="fieldLabel" tx={labelTx} text={label} />
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={theme.colors.lighterGrey}
        underlineColorAndroid={theme.colors.transparent}
        {...rest}
        style={inputStyle}
        ref={forwardedRef}
      />
    </View>
  );
};
