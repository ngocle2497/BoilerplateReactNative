import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';

import { View } from '@rn-core';
import { useStyles } from '@theme';

import { DividerProps } from './type';

export const Divider = ({
  height = 1,
  colorTheme,
  color = '#bbb',
}: DividerProps) => {
  // state
  const { theme } = useStyles();

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      backgroundColor:
        colorTheme && typeof theme.color[colorTheme] === 'string'
          ? (theme.color[colorTheme] as string)
          : color,
      height,
      width: '100%',
    }),
    [color, colorTheme, height, theme.color],
  );

  // render
  return <View style={[divider]} />;
};
