import { ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
import { ButtonPresetNames } from './Button.presets';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string;

  text?: string;

  style?: ViewStyle | ViewStyle[];

  textStyle?: TextStyle | TextStyle[];

  preset?: ButtonPresetNames;

  children?: React.ReactNode;

}
