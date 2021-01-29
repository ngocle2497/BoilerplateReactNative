import React, {memo, useCallback, useEffect, useState} from "react";
import {TouchableWithoutFeedback, StyleSheet} from "react-native";
import equals from "react-fast-compare";
import {interpolateColor, mix, useTimingTransition} from "@animated";
import Animated, {interpolate, Extrapolate} from "react-native-reanimated";
import {onCheckType} from "@common";

import {SwitchProps} from "./Switch.props";

// dimensions
const THUMB_SIZE = 30;
const WIDTH = 56;
const MARGIN = 2;
const OFF_POSITION = -0.5;
const ON_POSITION = WIDTH - THUMB_SIZE - MARGIN;
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4;

// colors
const ON_COLOR = "#2ecc71";
const OFF_COLOR = "#e6e6e6";
const BORDER_OFF_COLOR = "rgba(0, 0, 0, 0.1)";

const styles = StyleSheet.create({
  track: {
    width: WIDTH,
    height: THUMB_SIZE + MARGIN,
    borderRadius: BORDER_RADIUS,
    borderWidth: MARGIN / 2,
    borderColor: BORDER_OFF_COLOR,
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderColor: BORDER_OFF_COLOR,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: "#FFFFFF",
    shadowColor: BORDER_OFF_COLOR,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});

const SwitchComponent = ({
  onToggle,
  initialValue = false,
  disable = false,
}: Omit<SwitchProps, "type">) => {
  const [value, setValue] = useState<boolean>(initialValue);
  const progress = useTimingTransition(value);
  const opacity = mix(useTimingTransition(disable), 1, 0.5);
  const translateX = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [OFF_POSITION, ON_POSITION],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundColor = interpolateColor(progress, {
    inputRange: [0, 1],
    outputRange: [OFF_COLOR, ON_COLOR],
  });
  const _onToggle = useCallback(() => {
    setValue((v) => !v);
  }, []);
  useEffect(() => {
    if (onToggle && onCheckType(onToggle, "function")) {
      onToggle(value);
    }
  }, [onToggle, value]);
  return (
    <TouchableWithoutFeedback disabled={disable} onPress={_onToggle}>
      <Animated.View style={[styles.track, {backgroundColor, opacity}]}>
        <Animated.View style={[styles.thumb, {transform: [{translateX}]}]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
export const Switch = memo(SwitchComponent, equals);
