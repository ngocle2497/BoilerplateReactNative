import React, {useMemo, useCallback, useState, useEffect} from "react";
import {StyleSheet} from "react-native";
import equals from "react-fast-compare";
import {SpacingDefault} from "@theme/spacing";
import {ColorDefault} from "@theme/color";
import {enhance, onCheckType} from "@common";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {Text} from "../Text/Text";
import {Button} from "../Button/Button";
import {Block} from "../Block/Block";

import {CheckboxProps} from "./CheckBox.props";

const DIMENSIONS = {width: 16, height: 16};
const styles = StyleSheet.create({
  ROOT: {
    flexDirection: "row",
    paddingVertical: SpacingDefault.tiny,
    alignSelf: "flex-start",
  },
  OUTLINE: {
    ...DIMENSIONS,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.primary,
    borderRadius: 1,
  },
  FILL: {
    width: DIMENSIONS.width - 4,
    height: DIMENSIONS.height - 4,
    backgroundColor: ColorDefault.primary,
  },
  LABEL: {
    paddingLeft: SpacingDefault.smaller,
  },
});

const CheckBoxComponent = ({
  fillStyle,
  onToggle,
  outlineStyle,
  style,
  text,
  tx,
  disable = false,
  initialValue = false,
}: CheckboxProps) => {
  const scale = useSharedValue(initialValue ? 1 : 0);
  const opacity = useSharedValue(initialValue ? 1 : 0);

  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const _rootStyle = useMemo(() => enhance([styles.ROOT, style ?? {}]), [
    style,
  ]);

  const _outlineStyle = useMemo(
    () => enhance([styles.OUTLINE, outlineStyle ?? {}]),
    [outlineStyle],
  );

  const _fillStyle = useMemo(() => enhance([styles.FILL, fillStyle ?? {}]), [
    fillStyle,
  ]);

  const _labelStyle = useMemo(() => styles.LABEL, []);

  const onPress = useCallback(() => {
    setLocalValue((v) => !v);
  }, []);

  useEffect(() => {
    if (onToggle && onCheckType(onToggle, "function")) {
      onToggle(localValue);
    }
    scale.value = withTiming(localValue ? 1 : 0, {duration: 150});
    opacity.value = withTiming(localValue ? 1 : 0, {duration: 150});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue, onToggle]);

  const styleAnimated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <Button
      activeOpacity={1}
      preset={"link"}
      disabled={disable}
      onPress={onPress}
      style={_rootStyle}>
      <>
        <Block style={_outlineStyle}>
          <Animated.View style={[_fillStyle, styleAnimated]} />
        </Block>
        <Text text={text} tx={tx} style={_labelStyle} />
      </>
    </Button>
  );
};
export const CheckBox = React.memo(CheckBoxComponent, equals);
