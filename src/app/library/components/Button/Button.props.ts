import { ViewStyle, TextStyle, TouchableOpacityProps, StyleProp } from 'react-native';
import { ButtonPresetNames } from './Button.presets';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  tx?: string;

  /**
   * Using text instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Overwrite style for text
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Preset for button
   * @default primary
   */
  preset?: ButtonPresetNames;

  /**
   * Children for button
   * @default undefined
   */
  children?: React.ReactNode;

}
