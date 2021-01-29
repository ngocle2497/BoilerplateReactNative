import React, {memo, useMemo} from "react";
import {enhance} from "@common";
import equals from "react-fast-compare";

import {Button} from "../Button/Button";
import {Text} from "../Text/Text";

import {SelectItemProps} from "./Select.props";
import {stylesItem as styles} from "./Select.preset";

const SelectItemComponent = ({
  index,
  item,
  onPress,
  customItem,
  textItemStyle,
}: SelectItemProps) => {
  const _onPress = () => {
    onPress && onPress(item, index);
  };
  const text = useMemo(
    () => enhance([styles.textOption, textItemStyle ?? {}]),
    [textItemStyle],
  );
  return (
    <Button style={[styles.row]} onPress={_onPress} activeOpacity={0.85}>
      {customItem ? (
        customItem(item, index)
      ) : (
        <Text style={[text]} text={item.text ?? ""} />
      )}
    </Button>
  );
};
export const SelectItem = memo(SelectItemComponent, equals);
