/* eslint-disable @typescript-eslint/ban-types */
import React, {useState, useRef, useEffect, useMemo} from "react";
import {StyleSheet, Text, useWindowDimensions, Animated} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {enhance} from "@common";

import {Button} from "../../../Button/Button";
import {Block} from "../../../Block/Block";
import {Icon} from "../../../Icon/Icon";

import {FABGroupProps, Actions} from "./FABGroup.props";
import {ButtonGroup, SPACE_BETWEEN} from "./ButtonGroup";

export const SIZE_FAB = 60;
const styles = StyleSheet.create({
  wrap: {
    minWidth: SIZE_FAB,
    height: SIZE_FAB,
    borderRadius: SIZE_FAB / 2,
    backgroundColor: "#fe00f6",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    zIndex: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "normal",
    fontFamily: undefined,
    paddingLeft: 5,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  wrapAction: {
    position: "absolute",
    zIndex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
export const FABGroup = (props: FABGroupProps) => {
  const {style, icon, label, actions = []} = props;
  const window = useWindowDimensions();
  const [isShow, setIsShow] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const inset = useSafeAreaInsets();
  const styleBase = useMemo(
    () =>
      enhance([
        styles.wrap,
        {right: inset.right + 15, height: SIZE_FAB, bottom: inset.bottom + 5},
        style ?? {},
      ]),
    [inset, style],
  );
  const _show = () => {
    setIsShow(true);
  };
  const _hide = () => {
    setIsShow(false);
  };
  const onStartShouldSetResponder = () => true;
  const onPressItem = (onPressAction: Function) => {
    setIsShow(false);

    onPressAction && onPressAction();
  };
  useEffect(() => {
    Animated.spring(progress, {
      toValue: isShow ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [isShow]);
  return (
    <>
      <Button
        onPress={_show}
        activeOpacity={0.6}
        preset={"link"}
        style={[styleBase]}>
        <Icon icon={icon} />
        {React.isValidElement(label)
          ? label
          : label && <Text style={[styles.label]} text={label as string} />}
      </Button>
      {isShow === true && (
        <Block
          onStartShouldSetResponder={onStartShouldSetResponder}
          onResponderRelease={_hide}
          style={[
            styles.background,
            {width: window.width, height: window.height},
          ]}
        />
      )}
      <Block
        onStartShouldSetResponder={onStartShouldSetResponder}
        style={[
          styles.wrapAction,
          {
            right: inset.right + 25,
            bottom: inset.bottom + SIZE_FAB + SPACE_BETWEEN / 2,
          },
        ]}>
        {actions.map((item: Actions, index: number) => (
          <ButtonGroup
            index={index}
            icon={item.icon}
            label={item.label}
            onPressItem={item.onPress}
            progress={progress}
            onPress={onPressItem}
          />
        ))}
      </Block>
    </>
  );
};
