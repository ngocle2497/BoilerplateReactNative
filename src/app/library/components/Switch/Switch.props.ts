import { ViewStyle, StyleProp } from 'react-native';

type type = 'android' | 'ios'

export interface SwitchProps {
  /**
   * Type of switch
   * @default ios
   */
  type?: type;
  /**
   * Current state of switch
   * @default false
   */
  initialValue?: boolean;

  /**
   * Disable switch
   * @default false
   */
  disable?: boolean;
  /**
   * Call back when switch press
   * @default undefined
   */
  onToggle?: (newValue: boolean) => void;
}
