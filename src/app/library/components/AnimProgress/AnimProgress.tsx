import React, {forwardRef, useImperativeHandle, memo, useEffect} from "react";
import {StyleSheet, Dimensions} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withRepeat,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import equals from "react-fast-compare";
import {useAnimationState} from "@common";

import {Block} from "../Block/Block";

const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
  position: {
    position: "absolute",
    top: 0,
    zIndex: 999,
  },
  wrap: {
    height: 3,
    width: width,
    backgroundColor: "transparent",
  },
  wrapAnim: {
    height: "100%",
    position: "absolute",
  },
});

export interface AnimProcessProps {
  color?: string;
  backgroundColor?: string;
  underStatusbar?: boolean;
}
const AnimProcessComponent = forwardRef((props: AnimProcessProps, ref) => {
  const [visible, setVisible] = useAnimationState(false);
  const inset = useSafeAreaInsets();
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    }),
    [],
  );
  const {
    color,
    backgroundColor = "transparent",
    underStatusbar = false,
  } = props;
  const widthPercent = useSharedValue(0);
  const widthAb = useDerivedValue(() =>
    interpolate(widthPercent.value, [0, 1], [width * 0.75, width * 0.05]),
  );
  const translateX = useDerivedValue(() =>
    interpolate(widthPercent.value, [0, 1], [-width * 0.75, width * 1.5]),
  );

  const style = useAnimatedStyle(() => ({
    width: widthAb.value,
    transform: [{translateX: translateX.value}],
    backgroundColor: color ?? "#FFFFFF",
  }));

  useEffect(() => {
    if (visible) {
      widthPercent.value = withRepeat(
        withTiming(1, {duration: 2000}),
        -1,
        false,
      );
    } else {
      widthPercent.value = 0;
    }
  }, []);

  return (
    <Block
      color={backgroundColor}
      style={[styles.position, {top: underStatusbar ? inset.top : 0}]}>
      <Block style={[styles.wrap]}>
        <Animated.View style={[styles.wrapAnim, style]} />
      </Block>
    </Block>
  );
});
export const AnimProcess = memo(AnimProcessComponent, equals);
export interface AnimProcessRef {
  show(): void;
  hide(): void;
}
