import {ImageStyle, ViewStyle, StyleProp} from "react-native";
import {ImageTypes} from "@assets/image";

type ResizeMode = "contain" | "cover" | "stretch" | "center";

export interface ImageProps {
  /**
   * Overwrite image style
   * @default undefined
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Overwrite wrap image style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Source image(local)
   * @default undefined
   */
  source?: ImageTypes;

  resizeMode?: ResizeMode;
}
