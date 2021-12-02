import React from 'react';
import {ViewStyle, StyleProp} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
export interface ImageRemoteProps {
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
   * (Required) Url of image
   */
  source: string;

  /**
   * Source thumb(lazy load)
   * @default LGFFaXYk^6#M@-5c,1J5@[or[Q6.
   */
  blurHashOnLoad?: string;

  /**
   * Element when image load start
   * @default element with color #bbb
   */
  childrenOnload?: React.ReactNode;

  /**
   * Element when image load error
   * @default element with color #bbb
   */
  childrenError?: React.ReactNode;

  /**
   * Resize mode of image
   * @default contain
   */
  resizeMode?: keyof typeof FastImage.resizeMode;
}
