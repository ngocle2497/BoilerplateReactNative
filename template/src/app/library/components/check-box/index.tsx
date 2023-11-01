import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useAnimatedStyle } from 'react-native-reanimated';

import { useMix, useSharedTransition } from '@animated';
import { execFunc } from '@common';
import { AnimatedView, Text, View } from '@rn-core';

import { styles } from './styles';
import { CheckboxProps } from './type';

export const CheckBox = ({
  text,
  value,
  style,
  fillStyle,
  outlineStyle: outlineStyleOverwrite,
  onToggle,
  disable = false,
  initialValue = false,
}: CheckboxProps) => {
  // state
  const [localValue, setLocalValue] = useState<boolean>(initialValue);

  const progress = useSharedTransition(value ?? localValue);

  const scale = useMix(progress, 0, 1);

  const opacity = useMix(progress, 0, 1);

  // function
  const onPress = useCallback(() => {
    if (typeof value === 'boolean') {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);

      setLocalValue(v => !v);
    }
  }, [localValue, onToggle, value]);

  // reanimated style
  const styleAnimated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  // render
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disable}
      onPress={onPress}
      style={[styles.root, style]}>
      <>
        <View style={[styles.outline, outlineStyleOverwrite]}>
          <AnimatedView style={[styles.fill, fillStyle, styleAnimated]} />
        </View>
        <Text children={text} style={styles.label} />
      </>
    </TouchableOpacity>
  );
};
