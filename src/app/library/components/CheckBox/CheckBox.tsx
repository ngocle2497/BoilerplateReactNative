import React, {useMemo, useCallback} from "react";
import {StyleSheet} from "react-native";
import equals from "react-fast-compare";
import {SpacingDefault} from "@theme/spacing";
import {ColorDefault} from "@theme/color";
import {enhance} from "@common";

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
  value,
}: CheckboxProps) => {
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
    onToggle && onToggle(!value);
  }, [onToggle, value]);
  return (
    <Button
      activeOpacity={1}
      preset={"link"}
      disabled={!onToggle}
      onPress={onPress}
      style={_rootStyle}>
      <>
        <Block style={_outlineStyle}>
          {value && <Block style={_fillStyle} />}
        </Block>
        <Text text={text} tx={tx} style={_labelStyle} />
      </>
    </Button>
  );
};
export const CheckBox = React.memo(CheckBoxComponent, equals);
