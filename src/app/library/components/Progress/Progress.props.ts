import {TextStyle, StyleProp} from 'react-native';
export interface ProgressProps {
  /**
   * Preset of Progress
   * @default linear
   */
  type: 'linear' | 'circle';

  /**
   * Current progress
   */
  progress: number;

  /**
   * Background color of progress (Circle)
   * @default #dbdbdb
   */
  bg?: string;

  /**
   * Foreground color fo progress (Circle)
   * @default #0057e7
   */
  fg?: string;

  /**
   * Stroke width (Circle)
   * @default 20
   */
  strokeWidth?: number;

  /**
   * Radios of progress (Circle)
   * @default 80
   */
  radius?: number;

  /**
   * Enable to show progress number (Circle)
   * @default true
   */
  showTextProgress?: boolean;

  /**
   * Overwrite text progress style (Circle)
   * @default undefined
   */
  textProgressStyle?: StyleProp<TextStyle>;
}
