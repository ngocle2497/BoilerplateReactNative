import React, {memo, useMemo} from 'react';
import {enhance, scale} from '@common';
import equals from 'react-fast-compare';

import {Block} from '../Block/Block';

import {SpacerProps} from './Spacer.props';

const SpacerComponent = (props: SpacerProps) => {
  const {
    children,
    style = {},
    height = 0,
    width = 0,
    backgroundColor = 'transparent',
  } = props;

  // style
  const actualStyle = useMemo(
    () =>
      enhance([
        {
          width: typeof width === 'number' ? scale(width) : width,
          height: typeof height === 'number' ? scale(height) : height,
          backgroundColor,
        },
        style,
      ]),
    [backgroundColor, height, style, width],
  );

  // render
  return <Block style={[actualStyle]}>{children && children}</Block>;
};
export const Spacer = memo(SpacerComponent, equals);
