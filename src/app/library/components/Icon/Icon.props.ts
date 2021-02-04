import {IconTypes} from '@assets/icon';
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
