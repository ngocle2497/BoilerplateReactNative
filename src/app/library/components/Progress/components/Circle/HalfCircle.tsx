import React, {memo} from "react";
import {StyleSheet} from "react-native";
import equals from "react-fast-compare";

import {Block} from "../../../Block/Block";
interface HalfCircleProps {
  color: string;

  radius: number;
}
const styles = StyleSheet.create({
  wrap: {
    overflow: "hidden",
  },
});

export const HalfCircleComponent = ({color, radius}: HalfCircleProps) => {
  return (
    <Block width={radius * 2} height={radius} style={[styles.wrap]}>
      <Block
        width={radius * 2}
        height={radius * 2}
        borderRadius={radius}
        color={color}
      />
    </Block>
  );
};
export const HalfCircle = memo(HalfCircleComponent, equals);
