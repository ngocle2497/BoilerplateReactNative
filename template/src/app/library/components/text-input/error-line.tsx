import React from 'react';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { sharedTiming } from '@animated';
import { useTheme } from '@theme';

import { styles } from './styles';
import { ErrorLineProps } from './type';

export const ErrorLine = ({ error, disabled }: ErrorLineProps) => {
  // state
  const { colors } = useTheme();

  const widthPercent = useDerivedValue(
    () =>
      sharedTiming(error.value && !disabled.value ? 100 : 0, { duration: 200 }),
    [],
  );

  // style
  const lineStyle = useAnimatedStyle(
    () => ({
      width: `${widthPercent.value}%`,
      backgroundColor: colors.error,
    }),
    [colors.error],
  );

  // render
  return (
    <Animated.View
      pointerEvents={'none'}
      style={[styles.lineStatus, lineStyle]}
    />
  );
};
