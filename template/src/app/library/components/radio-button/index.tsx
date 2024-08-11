import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';

import { useSharedTransition } from '@animated';
import { AnimatedView } from '@rn-core';

import { stylesSheet } from './styles';
import { RadioButtonProps } from './type';

export const RadioButton = ({
  value,
  onToggle,
  size = 24,
  disabled = false,
  initialValue = false,
}: RadioButtonProps) => {
  // state
  const { styles } = useStyles(stylesSheet);

  const [localValue, setLocalValue] = useState(initialValue);

  const progress = useSharedTransition(
    isTypeof(value, 'boolean') ? value : localValue,
    { duration: 200 },
  );

  // function
  const onPress = () => {
    if (typeof value === 'boolean') {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);

      setLocalValue(v => !v);
    }
  };

  // style
  const dotStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0, 1]) }],
  }));

  // render
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <AnimatedView style={styles.container(size, disabled)}>
        <AnimatedView
          pointerEvents={'none'}
          style={[styles.dot(size, disabled), dotStyle]}
        />
      </AnimatedView>
    </TouchableWithoutFeedback>
  );
};
