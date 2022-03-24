import React, { memo } from 'react';

import equals from 'react-fast-compare';

import { ProgressCircle } from './components/circle';
import { ProgressLinear } from './components/linear';
import { ProgressProps } from './type';

const ProgressComponent = (props: ProgressProps) => {
  // state
  const { type = 'linear' } = props;

  // style
  return type === 'linear' ? (
    <ProgressLinear {...props} />
  ) : (
    <ProgressCircle {...props} />
  );
};
export const Progress = memo(ProgressComponent, equals);
