import React, {memo} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {RadioButtonProps} from './RadioButton.props';
import {useTimingTransition, interpolateColor} from '@animated';
import Animated, {interpolate} from 'react-native-reanimated';
import equals from 'react-fast-compare';

const SIZE = 30;
const ACTIVE_COLOR = '#ff00a9';
const UN_ACTIVE_COLOR = '#999999';
const STROKE_WIDTH = 3;
const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

const RadioButtonComponent = (props: RadioButtonProps) => {
  const {
    value = false,
    activeColor = ACTIVE_COLOR,
    unActiveColor = UN_ACTIVE_COLOR,
    strokeWidth = STROKE_WIDTH,
    sizeDot = SIZE - 10,
    onPress,
  } = props;
  const progress = useTimingTransition(value, {duration: 100});
  const size = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, sizeDot - strokeWidth],
  });
  const color = interpolateColor(
    progress,
    {
      inputRange: [0, 1],
      outputRange: [unActiveColor, activeColor],
    },
    'rgb',
  );
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.wrap,
          {
            borderColor: color,
            width: sizeDot + 10,
            height: sizeDot + 10,
            borderRadius: (sizeDot + 10) / 2,
            borderWidth: strokeWidth,
          },
        ]}>
        <Animated.View
          pointerEvents={'none'}
          style={[
            styles.dot,
            {
              width: size,
              height: size,
              borderRadius: (sizeDot - strokeWidth) / 2,
              backgroundColor: color,
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const RadioButton = memo(RadioButtonComponent, equals);
