import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { sizeScale } from '@common/scale';
import { View } from '@components/core';

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
