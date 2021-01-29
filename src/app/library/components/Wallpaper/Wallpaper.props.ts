import {ImageStyle, StyleProp} from "react-native";
import {ImageTypes} from "@assets/image";

import {WallpaperPresets} from "./Wallpaper.presets";

export interface WallpaperProps {
  /**
   * Overwrite style of image
   * @default undefined
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Source image of wallpaper
   * @default undefined
   */
  backgroundImage?: ImageTypes;

  /**
   * Preset of wallpaper
   * @default stretch
   */
  preset?: WallpaperPresets;
}
