/* eslint-disable camelcase */
import {
  between,
  clamp,
  sharedClamp,
  timing,
  usePanGestureHandler,
  withOffset,
} from "@animated";
import React, {memo, useCallback, useEffect, useState} from "react";
import isEqual from "react-fast-compare";
import {View, LayoutChangeEvent, StyleSheet} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import Animated, {
  abs,
  add,
  and,
  call,
  cond,
  divide,
  eq,
  multiply,
  onChange,
  runOnJS,
  set,
  sub,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useCode,
  useDerivedValue,
  useSharedValue,
  useValue,
  Value,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {onCheckType} from "@common";

import {Text} from "../Text/Text";

import {
  ACTIVE_COLOR,
  HEIGHT_SLIDER,
  IN_ACTIVE_COLOR,
  LOWER_BOUND,
  THUMB_SIZE,
  UPPER_BOUND,
} from "./constants";
import {SliderProps} from "./type";

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  container: {
    height: HEIGHT_SLIDER,
    backgroundColor: IN_ACTIVE_COLOR,
    width: "100%",
  },
  thumb: {
    position: "absolute",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: THUMB_SIZE,
  },
});

const Slider_LinearComponent = ({
  lowerBound = LOWER_BOUND,
  upperBound = UPPER_BOUND,
  initialLinear = 50,
  onChangeLinear,
}: SliderProps) => {
  if (lowerBound >= upperBound) {
    throw Error("lowerBound must be less than upperBound");
  }
  const [width, setWidth] = useState<number>(0);

  const translationX = useSharedValue(0);

  const translateX = useDerivedValue(() =>
    sharedClamp(
      translationX.value,
      lowerBound - THUMB_SIZE,
      width - THUMB_SIZE,
    ),
  );

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
  useEffect(() => {
    console.log("object");
  }, [translateX.value]);
  useEffect(() => {
    translationX.value = withSpring(
      (initialLinear / upperBound) * width - THUMB_SIZE,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

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

export const Slider_Linear = memo(Slider_LinearComponent, isEqual);
