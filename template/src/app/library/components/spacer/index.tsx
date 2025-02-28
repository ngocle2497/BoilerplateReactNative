import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { View } from '@components/core';

import { SpacerProps } from './type';

export const Spacer = ({ height = 0, width = 0 }: SpacerProps) => {
  // style
  const actualStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      height,
      width,
    }),
    [height, width],
  );

  // render
  return <View style={actualStyle} />;
};
