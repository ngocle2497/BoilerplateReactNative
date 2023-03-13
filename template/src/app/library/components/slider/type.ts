export interface SliderProps {
  /**
   * Type of slider
   * @default linear
   */
  type: 'linear' | 'range';

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

  /**
   * Default value of range slider
   */
  initialRange?: [v1: number, v2: number];

  /**
   * Event when range slider change value
   * @default undefined
   */
  onChangeRange?: (changed: ArgsChangeRange) => void;
}

export type SliderRangeProps = Omit<
  SliderProps,
  'type' | 'initialLinear' | 'onChangeLinear'
>;

export type ArgsChangeRange = {
  lower: number;
  upper: number;
  /**
   * this value is true when thumb left slide over thumb right
   */
  reverted: boolean;
};
