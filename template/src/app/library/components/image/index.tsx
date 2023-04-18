import { Image as ExpoImage } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import { ImageProps } from "./type";

export const Image = ({ ...rest }: ImageProps) => {
  // render
  return (
    <ExpoImage
      transition={{ duration: 600, effect: "cross-dissolve" }}
      {...rest}
      style={[StyleSheet.absoluteFillObject]}
    />
  );
};
