import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {IconTypes} from '@assets/icon';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {useInterpolate} from '@animated';
import isEqual from 'react-fast-compare';
import {onCheckType} from '@common';

import {Button} from '../../../Button/Button';
import {Icon} from '../../../Icon/Icon';
import {Text} from '../../../Text/Text';

export const SIZE_BUTTON_GROUP = 40;
export const SPACE_BETWEEN = 10;
const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: SPACE_BETWEEN,
    zIndex: 5,
  },
  wrap: {
    width: SIZE_BUTTON_GROUP,
    height: SIZE_BUTTON_GROUP,
    borderRadius: SIZE_BUTTON_GROUP / 2,
    backgroundColor: '#99aab5',
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  wrapLabel: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  text: {
    fontFamily: undefined,
    fontWeight: 'normal',
  },
});

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
      <Button activeOpacity={0.6} onPress={_onPress} style={[styles.wrap]}>
        <Icon icon={icon} />
      </Button>
    </Animated.View>
  );
};
export const ButtonGroup = memo(ButtonGroupComponent, isEqual);
