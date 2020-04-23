import React from "react";
import { StyleSheet } from "react-native";
import { Block } from "../../../Block/Block";

interface HalfCircleProps {
    color: string;

    radius: number;
}
const styles = StyleSheet.create({
    wrap: {
        overflow: "hidden",
    },
})

export const HalfCircle = ({ color, radius }: HalfCircleProps) => {
    return (
        <Block
            style={[styles.wrap, {
                width: radius * 2,
                height: radius,
            }]}>
            <Block
                style={[{
                    width: radius * 2,
                    height: radius * 2,
                    borderRadius: radius,
                    backgroundColor: color,
                }]}
            />
        </Block>
    );
};