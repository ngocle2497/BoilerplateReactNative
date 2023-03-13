import React from 'react';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { sharedTiming } from '@animated';
import { useTheme } from '@theme';

import { styles } from './styles';
import { FocusedLineProps } from './type';

export const FocusedLine = ({ focused, disabled }: FocusedLineProps) => {
  // state
  const { colors } = useTheme();

  const widthPercent = useDerivedValue(
    () =>
      sharedTiming(focused.value && !disabled.value ? 100 : 0, {
        duration: 200,
      }),
    [],
  );

  // style
  const lineStyle = useAnimatedStyle(
    () => ({
      width: `${widthPercent.value}%`,
      backgroundColor: colors.primary,
    }),
    [],
  );

  // render
  return (
    <Animated.View
      pointerEvents={'none'}
      style={[styles.lineStatus, lineStyle]}
    />
  );
};
