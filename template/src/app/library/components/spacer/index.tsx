import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { sizeScale } from '@common';

import { SpacerProps } from './type';

export const Spacer = ({ height = 0, width = 0 }: SpacerProps) => {
  // style
  const actualStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: typeof width === 'number' ? sizeScale(width) : width,
      height: typeof height === 'number' ? sizeScale(height) : height,
    }),
    [height, width],
  );

  // render
  return <View style={actualStyle} />;
};
