import {
  sharedClamp,
  sharedMax,
  sharedSpring,
  sharedSub,
  useMin,
} from '@animated';
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

import {
  FIXED_AFTER,
  INITIAL_RANGE,
  LOWER_BOUND,
  THUMB_SIZE,
  UPPER_BOUND,
} from './constants';
import {stylesRange as styles} from './styles';
import {SliderRangeProps} from './type';

const SliderRangeComponent = ({
  lowerBound = LOWER_BOUND,
  upperBound = UPPER_BOUND,
  initialRange = INITIAL_RANGE,
  onChangeRange,
}: SliderRangeProps) => {
  if (lowerBound >= upperBound) {
    throw Error('lowerBound must be less than upperBound');
  }
  if (onChangeRange && !onCheckType(onChangeRange, 'function')) {
    throw Error('onChangeRange must be function');
  }
  if (initialRange.some(x => x > upperBound || x < lowerBound)) {
    throw Error('initialRange must be within range');
  }
  // state
  const [width, setWidth] = useState<number>(0);

  // reanimated
  const progress = useSharedValue({lower: 0, upper: 0});
  const translationLeftX = useSharedValue(0);
  const translateLeftX = useDerivedValue(() =>
    sharedClamp(
      translationLeftX.value,
      lowerBound - THUMB_SIZE,
      width - THUMB_SIZE,
    ),
  );

  const translationRightX = useSharedValue(0);
  const translateRightX = useDerivedValue(() =>
    sharedClamp(
      translationRightX.value,
      lowerBound - THUMB_SIZE,
      width - THUMB_SIZE,
    ),
  );

  const leftTrack = useMin(translateLeftX, translateRightX);
  const rightTrack = useDerivedValue(() =>
    sharedSub(
      width - THUMB_SIZE,
      sharedMax(translateLeftX.value, translateRightX.value),
    ),
  );

  // function
  const gestureHandlerThumbLeft = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = translationLeftX.value;
    },
    onActive: (event, ctx) => {
      translationLeftX.value = ctx.startX + event.translationX;
    },
    onFinish: () => {
      if (onChangeRange) {
        runOnJS(onChangeRange)(progress.value);
      }
    },
  });

  const gestureHandlerThumbRight = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = translationRightX.value;
    },
    onActive: (event, ctx) => {
      translationRightX.value = ctx.startX + event.translationX;
    },
    onFinish: () => {
      if (onChangeRange) {
        runOnJS(onChangeRange)(progress.value);
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
    translationLeftX.value = sharedSpring(
      (Math.min(initialRange[0], initialRange[1]) / upperBound) * width -
        THUMB_SIZE,
    );
    translationRightX.value = sharedSpring(
      (Math.max(initialRange[0], initialRange[1]) / upperBound) * width -
        THUMB_SIZE,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (onChangeRange) {
      onChangeRange({lower: initialRange[0], upper: initialRange[1]});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimatedReaction(
    () => {
      const v1 = ((translateLeftX.value + THUMB_SIZE) / width) * upperBound;
      const v2 = ((translateRightX.value + THUMB_SIZE) / width) * upperBound;
      return {
        lower: parseFloat(Math.min(v1, v2).toFixed(FIXED_AFTER)),
        upper: parseFloat(Math.max(v1, v2).toFixed(FIXED_AFTER)),
      };
    },
    result => {
      progress.value = result;
    },
  );
  // reanimated style
  const trackStyle = useAnimatedStyle(() => ({
    left: leftTrack.value,
    right: rightTrack.value,
  }));

  const thumbLeftStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateLeftX.value}],
  }));

  const thumbRightStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateRightX.value}],
  }));

  // render
  return (
    <View onLayout={_onLayout} style={[styles.root]}>
      <View style={[styles.container]}>
        <Animated.View style={[styles.wrapTrack]}>
          <Animated.View style={[styles.track, trackStyle]} />
        </Animated.View>
        <PanGestureHandler onGestureEvent={gestureHandlerThumbLeft}>
          <Animated.View style={[styles.thumb, thumbLeftStyle]} />
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={gestureHandlerThumbRight}>
          <Animated.View style={[styles.thumb, thumbRightStyle]} />
        </PanGestureHandler>
      </View>
      <View style={[styles.wrapValue]}>
        <Text>{lowerBound}</Text>
        <Text>{upperBound}</Text>
      </View>
    </View>
  );
};

export const SliderRange = memo(SliderRangeComponent, isEqual);
