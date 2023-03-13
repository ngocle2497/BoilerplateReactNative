import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { sharedClamp, sharedSpring, useInterpolate } from '@animated';
import { onCheckType } from '@common';

import { FIXED_AFTER, LOWER_BOUND, THUMB_SIZE, UPPER_BOUND } from './constants';
import { styles } from './styles';
import { SliderProps } from './type';

import { Text } from '../text';

export const SliderLinear = ({
  onChangeLinear,
  lowerBound = LOWER_BOUND,
  upperBound = UPPER_BOUND,
  initialLinear = 50,
}: SliderProps) => {
  if (lowerBound >= upperBound) {
    throw Error('lowerBound must be less than upperBound');
  }

  if (onChangeLinear && !onCheckType(onChangeLinear, 'function')) {
    throw Error('onChangeLinear must be function');
  }

  // state
  const [width, setWidth] = useState<number>(0);

  // reanimated
  const translationX = useSharedValue(0);

  const progress = useSharedValue(0);

  const translateX = useDerivedValue(() =>
    sharedClamp(translationX.value, -THUMB_SIZE, width - THUMB_SIZE),
  );

  const progressValue = useInterpolate(
    translateX,
    [-THUMB_SIZE, width - THUMB_SIZE],
    [lowerBound, upperBound],
  );

  // function
  const gestureHandler = Gesture.Pan()
    .onChange(e => {
      'worklet';
      translationX.value += e.changeX;
    })
    .onEnd(() => {
      if (onChangeLinear) {
        runOnJS(onChangeLinear)(progress.value);
      }
    });

  const onLayout = ({
    nativeEvent: {
      layout: { width: widthWrap },
    },
  }: LayoutChangeEvent) => {
    setWidth(widthWrap);
  };

  // effect
  useEffect(() => {
    const percentLeft =
      (initialLinear - lowerBound) / (upperBound - lowerBound);

    translationX.value = sharedSpring(percentLeft * width - THUMB_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (onChangeLinear) {
      onChangeLinear(initialLinear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimatedReaction(
    () => progressValue.value,
    result => {
      const value1 = parseFloat(result.toFixed(FIXED_AFTER));

      progress.value = value1;
    },
  );

  // reanimated style
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // render
  return (
    <View onLayout={onLayout} style={[styles.root]}>
      <View style={[styles.container]}>
        <Animated.View style={[styles.track]} />
        <GestureDetector gesture={gestureHandler}>
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </GestureDetector>
      </View>
      <View style={[styles.wrapValue]}>
        <Text>{lowerBound}</Text>
        <Text>{upperBound}</Text>
      </View>
    </View>
  );
};
