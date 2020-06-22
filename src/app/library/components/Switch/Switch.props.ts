import {ViewStyle, StyleProp} from 'react-native';

export interface SwitchProps {
  /**
   * Current state of switch
   * @default false
   */
  value?: boolean;

  /**
   * Call back when switch press
   * @default undefined
   */
  onToggle?: (newValue: boolean) => void;

  /**
   * Overwrite container style
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Overwrite track on style
   * @default undefined
   */
  trackOnStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite track off style
   * @default undefined
   */
  trackOffStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite thumb on style
   * @default undefined
   */
  thumbOnStyle?: StyleProp<ViewStyle>;

  /**
   *Overwrite thumb off style
   * @default undefined
   */
  thumbOffStyle?: StyleProp<ViewStyle>;
}
