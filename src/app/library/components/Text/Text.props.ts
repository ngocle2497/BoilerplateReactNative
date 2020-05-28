import { TextStyle, TextProps as TextProperties, StyleProp } from 'react-native';
import { TextPresets } from './Text.presets';

export interface TextProps extends TextProperties {

  /**
   * Children of text
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  tx?: string;

  /**
   * Option of i18n
   * @default undefined
   */
  txOptions?: object;

  /**
   * Using text string instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Overwrite style of text component
   * @default undefined
   */
  style?: StyleProp<TextStyle>;

  /**
   * Preset of text
   * @default default
   */
  preset?: TextPresets;

}
