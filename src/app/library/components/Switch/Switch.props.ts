type type = 'android' | 'ios';

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
   * overwrite value
   * @default undefined
   */
  value?: boolean;

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
