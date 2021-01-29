export interface HelperTextProps {
  /**
   * Show text or not
   * @default false
   */
  visible: boolean;

  /**
   * Type of helper text
   */
  type: "info" | "error";

  /**
   * Text for text component
   */
  msg: string;
}
