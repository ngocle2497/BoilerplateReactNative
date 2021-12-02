import {sharedClamp, sharedSpring} from '@animated';
import {onCheckType} from '@common';
import React, {memo, useCallback, useEffect, useState} from 'react';
import isEqual from 'react-fast-compare';
import {LayoutChangeEvent, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import {Text} from '../text';

import {FIXED_AFTER, LOWER_BOUND, THUMB_SIZE, UPPER_BOUND} from './constants';
import {styles} from './styles';
import {SliderProps} from './type';

const SliderLinearComponent = ({
  lowerBound = LOWER_BOUND,
  upperBound = UPPER_BOUND,
  initialLinear = 50,
  onChangeLinear,
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
    sharedClamp(
      translationX.value,
      lowerBound - THUMB_SIZE,
      width - THUMB_SIZE,
    ),
  );
  // function
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = translationX.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      if (onChangeLinear) {
        runOnJS(onChangeLinear)(progress.value);
      }
    },
  });

  const _onLayout = useCallback(
    ({
      nativeEvent: {
        layout: {width: widthWrap},
      },
    }: LayoutChangeEvent) => {
      setWidth(widthWrap);
    },
    [],
  );

  // effect
  useEffect(() => {
    translationX.value = sharedSpring(
      (initialLinear / upperBound) * width - THUMB_SIZE,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (onChangeLinear) {
      onChangeLinear(initialLinear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimatedReaction(
    () =>
      parseFloat(
        (((translateX.value + THUMB_SIZE) / width) * upperBound).toFixed(
          FIXED_AFTER,
        ),
      ),
    result => {
      progress.value = result;
    },
  );

  // reanimated style
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  // render
  return (
    <View onLayout={_onLayout} style={[styles.root]}>
      <View style={[styles.container]}>
        <Animated.View style={[styles.track]} />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </PanGestureHandler>
      </View>
      <View style={[styles.wrapValue]}>
        <Text>{lowerBound}</Text>
        <Text>{upperBound}</Text>
      </View>
    </View>
  );
};

export const SliderLinear = memo(SliderLinearComponent, isEqual);
