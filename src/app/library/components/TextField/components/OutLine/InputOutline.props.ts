import {TextStyle, TextInputProps} from 'react-native';

export interface InputOutlineProps extends TextInputProps {
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
  onChange?: (value: string, keyName?: string) => void;

  /**
   * Name of key to update object when input change text
   * @default undefined
   */
  keyName?: string;

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
   * Overwrite input style
   * @default undefined
   */
  inputStyle?: TextStyle | TextStyle[];

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
