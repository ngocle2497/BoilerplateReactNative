import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import FastImage, { FastImageProps, ImageStyle } from 'react-native-fast-image';

export interface ImageProps
  extends CustomOmit<FastImageProps, 'source' | 'style' | 'resizeMode'> {
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
  source: string | number | Record<string, unknown>;

  /**
   * Source thumb(lazy load)
   * @default L9AB*A%LPqys8_H=yDR5nMMeVXR5
   */
  blurHashOnLoad?: string;

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
