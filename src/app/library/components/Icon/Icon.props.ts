import {ImageStyle, ViewStyle, StyleProp} from 'react-native';
import {IconTypes} from '@assets/icon';

export interface IconProps {
  /**
   * Overwrite icon style
   * @default undefined
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Overwrite wrap icon style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Icon type
   * @default undefined
   */
  icon?: IconTypes;
}
