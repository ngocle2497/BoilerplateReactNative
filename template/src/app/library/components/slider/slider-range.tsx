import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import {
  sharedClamp,
  sharedMax,
  sharedSub,
  sharedTiming,
  useInterpolate,
  useMin,
} from '@animated';
import { onCheckType } from '@common';

import {
  FIXED_AFTER,
  INITIAL_RANGE,
  LOWER_BOUND,
  THUMB_SIZE,
  UPPER_BOUND,
} from './constants';
import { stylesRange as styles } from './styles';
import { ArgsChangeRange, SliderRangeProps } from './type';

import { Text } from '../text';

export const SliderRange = forwardRef(
  (
    {
      onChangeRange,
      lowerBound = LOWER_BOUND,
      upperBound = UPPER_BOUND,
      initialRange = INITIAL_RANGE,
    }: SliderRangeProps,
    ref,
  ) => {
    if (lowerBound >= upperBound) {
      throw Error('lowerBound must be less than upperBound');
    }

    if (!onCheckType(onChangeRange, 'function')) {
      throw Error('onChangeRange must be function');
    }

    if (initialRange.some(x => x > upperBound || x < lowerBound)) {
      throw Error('initialRange must be within range');
    }

    if (initialRange.length < 2 || initialRange[0] === initialRange[1]) {
      throw Error('initialRange must be format [min,max]');
    }

    // state
    const [width, setWidth] = useState<number>(0);

    // reanimated

    const resultChange = useSharedValue<ArgsChangeRange>({
      lower: 0,
      upper: 0,
      reverted: false,
    });

    const translationLeftX = useSharedValue(0);

    const translateLeftX = useDerivedValue(() =>
      sharedClamp(translationLeftX.value, -THUMB_SIZE, width - THUMB_SIZE),
    );

    const leftThumbValue = useInterpolate(
      translateLeftX,
      [-THUMB_SIZE, width - THUMB_SIZE],
      [lowerBound, upperBound],
    );

    const translationRightX = useSharedValue(0);

    const translateRightX = useDerivedValue(() =>
      sharedClamp(translationRightX.value, -THUMB_SIZE, width - THUMB_SIZE),
    );

    const rightThumbValue = useInterpolate(
      translateRightX,
      [-THUMB_SIZE, width - THUMB_SIZE],
      [lowerBound, upperBound],
    );

    const leftTrack = useMin(translateLeftX, translateRightX);

    const rightTrack = useDerivedValue(() =>
      sharedSub(
        width - THUMB_SIZE,
        sharedMax(translateLeftX.value, translateRightX.value),
      ),
    );

    // function
    const onFinalize = () => {
      'worklet';
      const isRevert = translationLeftX.value > translateRightX.value;

      if (onChangeRange) {
        runOnJS(onChangeRange)({ ...resultChange.value, reverted: isRevert });
      }
    };

    const gestureHandlerThumbLeft = Gesture.Pan()
      .onChange(e => {
        'worklet';
        translationLeftX.value += e.changeX;
      })
      .onFinalize(onFinalize);

    const gestureHandlerThumbRight = Gesture.Pan()
      .onChange(e => {
        'worklet';
        translationRightX.value += e.changeX;
      })
      .onFinalize(onFinalize);

    const _onLayout = useCallback(
      ({
        nativeEvent: {
          layout: { width: widthWrap },
        },
      }: LayoutChangeEvent) => {
        setWidth(widthWrap);
      },
      [],
    );

    const runAnimation = useCallback(
      (lowerValue: number, upperValue: number) => {
        const percentLeft =
          (lowerValue - lowerBound) / (upperBound - lowerBound);

        const percentRight =
          (upperValue - lowerBound) / (upperBound - lowerBound);

        const left = percentLeft * width;

        const right = percentRight * width;

        translationLeftX.value = sharedTiming(left - THUMB_SIZE);

        translationRightX.value = sharedTiming(right - THUMB_SIZE);
      },
      [lowerBound, translationLeftX, translationRightX, upperBound, width],
    );

    // effect
    useAnimatedReaction(
      () => ({ v1: leftThumbValue.value, v2: rightThumbValue.value }),
      res => {
        const value1 = parseFloat(res.v1.toFixed(FIXED_AFTER));

        const value2 = parseFloat(res.v2.toFixed(FIXED_AFTER));

        resultChange.value = {
          lower: parseFloat(Math.min(value1, value2).toFixed(FIXED_AFTER)),
          upper: parseFloat(Math.max(value1, value2).toFixed(FIXED_AFTER)),
          reverted: false,
        };
      },
    );

    useEffect(() => {
      if (width !== 0) {
        runAnimation(initialRange[0], initialRange[1]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    useEffect(() => {
      if (onChangeRange) {
        onChangeRange({
          lower: initialRange[0],
          upper: initialRange[1],
          reverted: false,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        setRange: (args: ArgsChangeRange) => {
          console.log(JSON.stringify(args));

          runAnimation(
            args.reverted ? args.upper : args.lower,
            !args.reverted ? args.upper : args.lower,
          );
        },
      }),
      [runAnimation],
    );

    // reanimated style
    const trackStyle = useAnimatedStyle(() => ({
      left: leftTrack.value,
      right: rightTrack.value,
    }));

    const thumbLeftStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateLeftX.value }],
    }));

    const thumbRightStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateRightX.value }],
    }));

    // render
    return (
      <View onLayout={_onLayout} style={[styles.root]}>
        <View style={[styles.container]}>
          <Animated.View style={[styles.wrapTrack]}>
            <Animated.View style={[styles.track, trackStyle]} />
          </Animated.View>
          <GestureDetector gesture={gestureHandlerThumbLeft}>
            <Animated.View style={[styles.thumb, thumbLeftStyle]} />
          </GestureDetector>
          <GestureDetector gesture={gestureHandlerThumbRight}>
            <Animated.View style={[styles.thumb, thumbRightStyle]} />
          </GestureDetector>
        </View>
        <View style={[styles.wrapValue]}>
          <Text>{lowerBound}</Text>
          <Text>{upperBound}</Text>
        </View>
      </View>
    );
  },
);

export type SliderRange = {
  setRange: (args: ArgsChangeRange) => void;
};
