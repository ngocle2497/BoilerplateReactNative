export type CheckboxProps = {
  /**
   * Default state of checkbox
   * @default false
   */
  initialValue?: boolean;

  /**
   * checkbox button size
   * @default 24
   */
  size?: number;

  /**
   * Overwrite value
   * @default undefined
   */
  value?: boolean;

  /**
   * On checkbox button press
   */
  onToggle?: (value: boolean) => void;

  /**
   * checkbox button is disabled
   * @default false
   */
  disabled?: boolean;
};
