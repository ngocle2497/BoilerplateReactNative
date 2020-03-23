import {TextInputProps, TextStyle, ViewStyle} from 'react-native';

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: string;

  placeholder?: string;

  /**
   * The label i18n key.
   */
  labelTx?: string;

  label?: string;

  style?: ViewStyle | ViewStyle[];

  inputStyle?: TextStyle | TextStyle[];

  preset?: 'default';

  forwardedRef?: any;
}
