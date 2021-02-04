/* eslint-disable camelcase */
import {sharedClamp, sharedSpring} from '@animated';
import React, {memo, useCallback, useEffect, useState} from 'react';
import isEqual from 'react-fast-compare';
import {View, LayoutChangeEvent, StyleSheet} from 'react-native';
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
import {onCheckType} from '@common';

import {Text} from '../Text/Text';

import {
  ACTIVE_COLOR,
  FIXED_AFTER,
  HEIGHT_SLIDER,
  IN_ACTIVE_COLOR,
  LOWER_BOUND,
  THUMB_SIZE,
  UPPER_BOUND,
} from './constants';
import {SliderProps} from './type';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
  },
  container: {
    height: HEIGHT_SLIDER,
    backgroundColor: IN_ACTIVE_COLOR,
    width: '100%',
    flex: 1,
  },
  thumb: {
    position: 'absolute',
    top: -THUMB_SIZE + HEIGHT_SLIDER / 2,
    left: 0,
    width: THUMB_SIZE * 2,
    height: THUMB_SIZE * 2,
    borderRadius: THUMB_SIZE,
    backgroundColor: ACTIVE_COLOR,
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ACTIVE_COLOR,
  },
  wrapValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THUMB_SIZE / 2,
  },
});

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
  useAnimatedReaction(
    () =>
      parseFloat(
        (((translateX.value + THUMB_SIZE) / width) * upperBound).toFixed(
          FIXED_AFTER,
        ),
      ),
    (progress) => {
      if (onChangeLinear) {
        runOnJS(onChangeLinear)(progress);
      }
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
