import React from 'react';

import { ProgressCircle } from './components/circle';
import { ProgressLinear } from './components/linear';
import { ProgressProps } from './type';

export const Progress = (props: ProgressProps) => {
  // state
  const { type = 'linear' } = props;

  // style
  return type === 'linear' ? (
    <ProgressLinear {...props} />
  ) : (
    <ProgressCircle {...props} />
  );
};
