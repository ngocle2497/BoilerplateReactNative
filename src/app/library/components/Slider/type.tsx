export interface SliderProps {
  /**
   * Min value of slider
   * @default 0
   */
  lowerBound?: number;

  /**
   * Max value of slider
   * @default 100
   */
  upperBound?: number;

  /**
   * Default value of linear slider
   * @default 0
   */
  initialLinear?: number;

  /**
   * Event when linear slider change value
   * @default undefined
   */
  onChangeLinear?: (progress: number) => void;
}
