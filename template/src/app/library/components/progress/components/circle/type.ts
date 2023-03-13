import { StyleProp, TextStyle } from 'react-native';

export interface ProgressCircleProps {
  /**
   * Current progress
   */
  progress: number;
  /**
   * Background color of progress
   * @default #dbdbdb
   */
  bg?: string;

  /**
   * Foreground color fo progress
   * @default #0057e7
   */
  fg?: string;

  /**
   * Stroke width
   * @default 5
   */
  strokeWidth?: number;

  /**
   * Radius of progress
   * @default 20
   */
  radius?: number;

  /**
   * Enable to show progress number
   * @default true
   */
  showTextProgress?: boolean;

  /**
   * Overwrite text progress style
   * @default undefined
   */
  textProgressStyle?: StyleProp<TextStyle>;

  /**
   * Round progress
   * @default false
   */
  round?: boolean;
}
