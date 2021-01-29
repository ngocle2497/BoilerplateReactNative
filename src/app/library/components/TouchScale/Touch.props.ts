/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-undef */
export interface TouchableScaleProps {
  /**
   * Children of Touchable
   */
  children: React.ReactNode;

  /**
   * Min scale when touch
   * @default 0.9
   */
  minScale?: number;

  /**
   * On Press of touch
   * @default undefined
   */
  onPress?: Function;

  /**
   * On Long Press of touch
   * @default undefined
   */
  onLongPress?: Function;

  /**
   * On Press In of touch
   * @default undefined
   */
  onPressIn?: Function;

  /**
   * On Press Out of touch
   * @default undefined
   */
  onPressOut?: Function;
}
