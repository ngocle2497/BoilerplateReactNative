import {TextInputProps, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {SetValueConfig} from 'react-hook-form/dist/types/form';

export interface InputBaseProps extends TextInputProps {
  /**
   * Disable input or not
   * @default false
   */
  disabled?: boolean;

  /**
   * Input invalid or not
   * @default false
   */
  error?: any;

  /**
   * Label title of input
   * @default undefined
   */
  label?: string;

  /**
   * Label text using i18n
   */
  labelTx?: string;

  /**
   * Function on input change text
   * @default undefined
   */
  onTextChange?: (name?: string, value?: string) => void;

  /**
   * Function on input change to call set value react hook form
   * @default undefined
   */
  onSetValueHookForm?: (
    name: string,
    value?: string,
    options?: SetValueConfig,
  ) => void;

  /**
   * Call trigger react hook form
   */
  trigger?: (name: string) => void;

  /**
   * function pass to last input of form when click return key
   */
  onSubmit?: () => void;
  /**
   * Name to trigger
   */
  nameTrigger?: string;

  /**
   * Name of key to update object when input change text
   * @default undefined
   */
  name?: string;

  /**
   * Set default value for input
   * @default undefined
   */
  defaultValue?: string;

  /**
   * Label color when input focus
   * @default rgb(159,152,146)
   */
  activeTintLabelColor?: string;

  /**
   * Border color when input focus
   * @default rgb(159,152,146)
   */
  activeTintBorderColor?: string;

  /**
   * Label color when input blue
   * @default rgb(159,152,146)
   */
  unActiveTintLabelColor?: string;

  /**
   * Border color when input blue
   * @default rgb(159,152,146)
   */
  unActiveTintBorderColor?: string;

  /**
   * Border color when input disabled
   * @default rgb(159,152,146)
   */
  disabledBorderColor?: string;

  /**
   * Label color when input disabled
   * @default rgb(159,152,146)
   */
  disabledLabelColor?: string;

  /**
   * Input color when input disabled
   * @default rgb(159,152,146)
   */
  disabledInputColor?: string;

  /**
   * Border color when input not valid
   * @default rgb(214,45,32)
   */
  errorBorderColor?: string;

  /**
   * Label color when input not valid
   * @default rgb(214,45,32)
   */
  errorLabelColor?: string;

  /**
   * Overwrite container input style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Overwrite input style
   * @default undefined
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Placeholder of input using i18n
   * @default undefined
   */
  placeholderTx?: string;

  /**
   * Placeholder of input
   * @default undefined
   */
  placeholder?: string;

  /**
   * Placeholder color
   * @default undefined
   */
  placeholderColor?: string;
}

export interface TextFieldProps extends InputBaseProps {
  /**
   * Preset of text
   * @default flat
   */
  typeInput: 'flat' | 'outline';
}
