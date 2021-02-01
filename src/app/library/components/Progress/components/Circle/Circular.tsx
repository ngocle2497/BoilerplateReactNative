import React, {memo, useMemo} from "react";
import {StyleSheet, ViewStyle} from "react-native";
import Animated, {
  Extrapolate,
  useDerivedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import equals from "react-fast-compare";
import {useInterpolate, useRadian} from "@animated";
import {enhance} from "@common";

import {Block} from "../../../Block/Block";

import {STROKE_WIDTH} from "./Constant";

const EMPTY_COLOR = "red";

interface CircularProps {
  progress: number;

  bg: string;

  fg: string;

  radius: number;

  strokeWidth: number;
}

const styles = StyleSheet.create({
  empty: {
    borderColor: EMPTY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    transform: [{rotate: "-135deg"}],
  },
  indicator: {
    position: "absolute",
    borderLeftColor: "green",
    borderTopColor: "green",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
  },
  cover: {
    position: "absolute",
    borderLeftColor: EMPTY_COLOR,
    borderTopColor: EMPTY_COLOR,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
  },
});

export const CircularComponent = ({
  progress,
  radius,
  fg,
  bg,
}: CircularProps) => {
  const progressAnimated = useDerivedValue(() => withTiming(progress));
  const firstRotate = useRadian(
    useInterpolate(progressAnimated, [0, 50], [0, 180], Extrapolate.CLAMP),
  );
  const secondRotate = useRadian(
    useInterpolate(progressAnimated, [0, 100], [0, 360], Extrapolate.CLAMP),
  );
  const secondOpacity = useInterpolate(
    progressAnimated,
    [0, 49.9999999, 50, 100],
    [0, 0, 1, 1],
    Extrapolate.CLAMP,
  );

  const baseStyle = useMemo<ViewStyle>(
    () => ({
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      borderWidth: STROKE_WIDTH,
    }),
    [radius],
  );

  const emptyStyle = useMemo<ViewStyle>(
    () => enhance([baseStyle, styles.empty, {borderColor: bg}]) as ViewStyle,
    [baseStyle, bg],
  );
  const coverStyle = useMemo<ViewStyle>(
    () =>
      enhance([
        baseStyle,
        styles.cover,
        {borderLeftColor: bg, borderTopColor: bg},
      ]) as ViewStyle,
    [baseStyle, bg],
  );
  const indicatorStyle = useMemo<ViewStyle>(
    () =>
      enhance([
        baseStyle,
        styles.indicator,
        {borderLeftColor: fg, borderTopColor: fg},
      ]) as ViewStyle,
    [baseStyle, fg],
  );
  const firstIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{rotate: firstRotate.value}],
  }));
  const secondIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{rotate: secondRotate.value}],
    opacity: secondOpacity.value,
  }));
  return (
    <Block style={[emptyStyle]}>
      <Animated.View style={[indicatorStyle, firstIndicatorStyle]} />
      <Animated.View style={[coverStyle]} />
      <Animated.View style={[indicatorStyle, secondIndicatorStyle]} />
    </Block>
  );
};
export const Circular = memo(CircularComponent, equals);
