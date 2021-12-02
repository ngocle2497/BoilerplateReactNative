import React, {memo} from 'react';
import equals from 'react-fast-compare';

import {ProgressCircle} from './components/circle';
import {ProgressLinear} from './components/linear';
import {ProgressProps} from './type';
import {
  RADIUS,
  STROKE_WIDTH,
  COLOR_BG,
  COLOR_FG,
} from './components/circle/constant';

const ProgressComponent = (props: ProgressProps) => {
  // state
  const {
    type,
    strokeWidth = STROKE_WIDTH,
    textProgressStyle = {},
    showTextProgress = true,
    bg = COLOR_BG,
    fg = COLOR_FG,
    radius = RADIUS,
    progress = 0,
  } = props;

  // style
  return type === 'linear' ? (
    <ProgressLinear {...props} />
  ) : (
    <ProgressCircle
      {...{
        progress,
        textProgressStyle,
        showTextProgress,
        bg,
        fg,
        radius,
        strokeWidth,
      }}
    />
  );
};
export const Progress = memo(ProgressComponent, equals);
