import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { View } from '@rn-core';
import { useStyles } from '@theme';

import { DividerProps } from './type';

export const Divider = ({
  height = 1,
  colorTheme = 'neutral200',
}: DividerProps) => {
  // state
  const { theme } = useStyles();

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      backgroundColor:
        colorTheme && typeof theme.color[colorTheme] === 'string'
          ? (theme.color[colorTheme] as string)
          : undefined,
      height: height * StyleSheet.hairlineWidth,
      width: '100%',
    }),
    [colorTheme, height, theme.color],
  );

  // render
  return <View style={divider} />;
};
