import {useInterpolate} from '@animated';
import {IconTypes} from '@assets/icon';
import {onCheckType} from '@common';
import React, {memo, useCallback} from 'react';
import isEqual from 'react-fast-compare';
import {TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import {Icon} from '../../../icon';
import {Text} from '../../../text';

import {stylesButton as styles} from './styles';

interface ButtonGroupProps {
  icon: IconTypes;

  onPress: (onPressItem?: () => void) => void;

  onPressItem?: () => void;

  progress: Animated.SharedValue<number>;

  index: number;

  label?: string;
}

const ButtonGroupComponent = (props: ButtonGroupProps) => {
  const {icon, onPress, onPressItem, label, index, progress} = props;
  // reanimated
  const actualProgress = useDerivedValue(() =>
    withSpring(progress.value, {stiffness: 100 + index * 60}),
  );
  const translateX = useInterpolate(actualProgress, [0, 1], [50, 0]);
  const opacity = useInterpolate(progress, [0, 0.4, 1], [0, 0, 1]);

  // function
  const _onPress = useCallback(() => {
    if (onCheckType(onPress, 'function')) {
      onPress(onPressItem);
    }
  }, [onPress, onPressItem]);

  // reanimated style
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}],
  }));

  // render
  return (
    <Animated.View style={[styles.root, style]}>
      {label && (
        <Animated.View style={[styles.wrapLabel]}>
          <Text style={[styles.text]} text={label} />
        </Animated.View>
      )}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={_onPress}
        style={[styles.wrap]}>
        <Icon icon={icon} />
      </TouchableOpacity>
    </Animated.View>
  );
};
export const ButtonGroup = memo(ButtonGroupComponent, isEqual);
