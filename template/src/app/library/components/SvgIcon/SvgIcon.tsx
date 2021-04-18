import {SvgComponent} from '@assets/svgIcon';
import React, {createElement, memo} from 'react';
import isEqual from 'react-fast-compare';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SvgIconProps} from './SvgIcon.props';

const SvgIconComponent = ({
  source,
  color = '#000',
  size = 24,
  onPress,
}: SvgIconProps) => {
  // render
  return (
    <TouchableOpacity
      disabled={typeof onPress !== 'function'}
      onPress={onPress}>
      {createElement(SvgComponent[source], {
        width: size,
        height: size,
        fill: color,
      })}
    </TouchableOpacity>
  );
};

export const SvgIcon = memo(SvgIconComponent, isEqual);
