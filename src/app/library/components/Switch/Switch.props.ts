export interface SwitchProps {
  /**
   * Current state of switch
   * @default false
   */
  initialValue?: boolean;

  /**
   * Call back when switch press
   * @default undefined
   */
  onToggle?: (newValue: boolean) => void;
}
