import { StyleProp, TextInputProps, TextStyle } from 'react-native';

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
  onOtpFilled?: (code: string) => void;
}
