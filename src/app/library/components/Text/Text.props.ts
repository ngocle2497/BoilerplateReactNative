import { TextStyle, TextProps as TextProperties } from 'react-native';
import { TextPresets } from './Text.presets';

export interface TextProps extends TextProperties {

  children?: React.ReactNode;

  /**
   * Text which is looked up via i18n.
   */
  tx?: string;

  txOptions?: object;

  text?: string;

  style?: TextStyle | TextStyle[];

  preset?: TextPresets;

}
