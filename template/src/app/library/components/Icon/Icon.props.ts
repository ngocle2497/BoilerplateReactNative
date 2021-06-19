import {IconTypes} from '@assets/icon';
import {Colors} from '@config/type';
import {ResizeMode} from 'react-native-fast-image';
export interface IconProps {
  /**
   * Size of Icon
   * @default 24
   */
  size?: number;

  /**
   * Tint color of icon
   * @default undefined
   */
  color?: string;

  /**
   * Overwrite tint color with theme
   */
  colorTheme?: keyof Colors;

  /**
   * Allow onPress to icon
   * @default undefined
   */
  onPress?: () => void;

  /**
   * Icon type
   * @default undefined
   */
  icon: IconTypes;

  /**
   * Custom resizeMode
   * @default contain
   */
  resizeMode?: ResizeMode;
}
