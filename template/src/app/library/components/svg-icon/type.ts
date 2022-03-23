import { SvgIconTypes } from '@assets/svgIcon';
import { Colors } from '@theme';

export interface SvgIconProps {
  /**
   * Source of svg file
   * @default undefined
   */
  source: SvgIconTypes;

  /**
   * Size of svg icon
   * @default 24
   */
  size?: number;

  /**
   * Fill color for icon
   * @default #000
   */
  color?: string;

  /**
   * Overwrite fill color with theme
   */
  colorTheme?: keyof Colors;

  /**
   * Function press icon
   * @default undefined
   */
  onPress?: () => void;
}
