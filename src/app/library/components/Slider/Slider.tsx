/* eslint-disable camelcase */
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

import {SliderLinear} from './SliderLinear';
import {SliderRange} from './SliderRange';
import {SliderProps} from './type';

const SliderComponent = (props: SliderProps) => {
  return props.type === 'range' ? (
    <SliderRange {...props} />
  ) : (
    <SliderLinear {...props} />
  );
};

export const Slider = memo(SliderComponent, isEqual);
