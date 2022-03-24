import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { SliderLinear } from './slider-linear';
import { SliderRange } from './slider-range';
import { SliderProps } from './type';

const SliderComponent = (props: SliderProps) => {
  // render
  return props.type === 'range' ? (
    <SliderRange {...props} />
  ) : (
    <SliderLinear {...props} />
  );
};

export const Slider = memo(SliderComponent, isEqual);
