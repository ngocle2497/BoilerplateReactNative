import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface OtpProps extends TextInputProps {
  /**
   * Number of Otp input
   */
  length: number;

  /**
   * Set default otp text
   * @default undefined
   */
  defaultOtp?: string;

  /**
   * Overwrite container style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite wrap input style
   * @default undefined
   */
  wrapInputStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite wrap input style when focus
   * @default undefined
   */
  wrapInputActiveStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite text input style
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Entry text instead default text (ex: *)
   * @default undefined
   */
  textEntry?: string;

  /**
   * Call back when otp length equal length
   * @default undefined
   */
  onOtpValid?: () => void;

  /**
   * Call back when otp length not equal length
   * @default undefined
   */
  onOtpInValid?: () => void;
}
