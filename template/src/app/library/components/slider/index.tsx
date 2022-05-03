import React from 'react';

import { SliderLinear } from './slider-linear';
import { SliderRange } from './slider-range';
import { SliderProps } from './type';

export const Slider = (props: SliderProps) => {
  // render
  return props.type === 'range' ? (
    <SliderRange {...props} />
  ) : (
    <SliderLinear {...props} />
  );
};
