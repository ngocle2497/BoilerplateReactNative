import {ViewStyle, StyleProp} from "react-native";

export interface CheckboxProps {
  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Overwrite out line style
   * @default undefined
   */
  outlineStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite for fill style
   *  @default undefined
   */
  fillStyle?: StyleProp<ViewStyle>;

  /**
   * Current state of check box
   * @default undefined
   */
  value?: boolean;

  /**
   * Text to display
   * @default undefined
   */
  text?: string;

  /**
   * Key to using i18n
   * @default undefined
   */
  tx?: string;

  /**
   * On change function
   * @default undefined
   */
  onToggle?: (newValue: boolean) => void;
}
