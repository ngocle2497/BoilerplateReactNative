import React, {memo} from "react";
import {StyleSheet, Image} from "react-native";
import isEqual from "react-fast-compare";
import {scale} from "@common";

import {ImageMessageProps} from "../Chat.props";
import {LightBox} from "../../LightBox/index";

const ImageMessageComponent = ({sourceImage = ""}: ImageMessageProps) => {
  return (
    <LightBox>
      <Image
        style={[styles.img]}
        resizeMode={"cover"}
        source={{uri: sourceImage}}
      />
    </LightBox>
  );
};

export const ImageMessage = memo(ImageMessageComponent, isEqual);

const styles = StyleSheet.create({
  img: {
    resizeMode: "cover",
    width: scale(150),
    height: scale(180),
  },
});
