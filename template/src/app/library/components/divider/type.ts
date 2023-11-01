import { Colors } from '@theme';

export interface DividerProps {
  /**
   * Background for divider
   * @default #bbb
   */
  color?: string;

  /**
   * Overwrite color with theme
   */
  colorTheme?: Colors;

  /**
   * Height of divider
   * @default 1
   */
  height?: number;
}
