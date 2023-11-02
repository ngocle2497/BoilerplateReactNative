import { IconTypes } from '@assets/icon';
import { Colors } from '@theme';

export interface IconProps {
  /**
   * Size of Icon
   * @default 24
   */
  size?: number;

  /**
   * Overwrite tint color with theme
   */
  colorTheme?: Colors;

  /**
   * Icon type
   * @default undefined
   */
  icon: IconTypes;
}
