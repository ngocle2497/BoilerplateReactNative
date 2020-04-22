import React from "react";
import { View, StyleSheet } from "react-native";

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
        <View
            style={[styles.wrap, {
                width: radius * 2,
                height: radius,
            }]}>
            <View
                style={[{
                    width: radius * 2,
                    height: radius * 2,
                    borderRadius: radius, 
                    backgroundColor: color,
                }]}
            />
        </View>
    );
};