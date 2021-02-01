import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, TouchableWithoutFeedback} from "react-native";
import {
  useSharedTransition,
  useInterpolate,
  useInterpolateColor,
} from "@animated";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import equals from "react-fast-compare";
import {onCheckType} from "@common";

import {RadioButtonProps} from "./RadioButton.props";

const SIZE = 30;
const ACTIVE_COLOR = "#ff00a9";
const UN_ACTIVE_COLOR = "#999999";
const STROKE_WIDTH = 3;
const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dot: {
    position: "absolute",
    alignSelf: "center",
  },
});

const RadioButtonComponent = (props: RadioButtonProps) => {
  const {
    defaultValue = false,
    activeColor = ACTIVE_COLOR,
    unActiveColor = UN_ACTIVE_COLOR,
    strokeWidth = STROKE_WIDTH,
    sizeDot = SIZE - 10,
    onToggle,
  } = props;
  const [value, setValue] = useState<boolean>(defaultValue);

  const _onPress = useCallback(() => {
    setValue((v) => !v);
  }, []);

  const progress = useSharedTransition(value, {duration: 200});
  const size = useInterpolate(progress, [0, 1], [0, sizeDot - strokeWidth]);
  const color = useInterpolateColor(
    progress,
    [0, 1],
    [unActiveColor, activeColor],
  );
  const wrapStyle = useMemo(
    () => ({
      width: sizeDot + 10,
      height: sizeDot + 10,
      borderRadius: (sizeDot + 10) / 2,
      borderWidth: strokeWidth,
    }),
    [sizeDot, strokeWidth],
  );
  const wrapAnimaStyle = useAnimatedStyle(() => ({
    borderColor: color.value as string,
  }));
  const dotStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: (sizeDot - strokeWidth) / 2,
    backgroundColor: color.value as string,
  }));

  useEffect(() => {
    if (onToggle && onCheckType(onToggle, "function")) {
      onToggle(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <Animated.View style={[styles.wrap, wrapStyle, wrapAnimaStyle]}>
        <Animated.View pointerEvents={"none"} style={[styles.dot, dotStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const RadioButton = memo(RadioButtonComponent, equals);
