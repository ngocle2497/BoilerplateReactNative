import React, {useState, memo} from "react";
import {StyleSheet, LayoutChangeEvent} from "react-native";
import {
  useValues,
  timing,
  useShareClamp,
  transformOrigin,
  useInterpolate,
  sharedTransformOrigin,
} from "@animated";
import Animated, {
  useCode,
  set,
  interpolateNode,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import equals from "react-fast-compare";

import {ProgressLinearProps} from "./ProgressLinear.props";

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 4,
    backgroundColor: "#dbdbdb",
    marginVertical: 3,
  },
  fg: {
    backgroundColor: "#0057e7",
    left: 0,
    width: "100%",
    height: "100%",
  },
});

export const ProgressLinearComponent = (props: ProgressLinearProps) => {
  const {progress} = props;

  const [widthProgress, setWidthProgress] = useState(0);

  const progressAnimated = useDerivedValue(() => withTiming(progress));
  const actualProgress = useShareClamp(progressAnimated, 0, 100);
  const scaleX = useInterpolate(actualProgress, [0, 100], [0, 1]);

  const _onLayoutBg = (e: LayoutChangeEvent) => {
    setWidthProgress(e.nativeEvent.layout.width);
  };

  const foregroundStyle = useAnimatedStyle(() => ({
    transform: sharedTransformOrigin(
      {x: -widthProgress / 2, y: 0},
      {scaleX: scaleX.value},
    ),
  }));

  return (
    <Animated.View onLayout={_onLayoutBg} style={[styles.bg]}>
      <Animated.View style={[styles.fg, foregroundStyle]} />
    </Animated.View>
  );
};

export const ProgressLinear = memo(ProgressLinearComponent, equals);
