import {ImageStyle, ViewStyle, StyleProp} from 'react-native';
import FastImage from 'react-native-fast-image';
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
  imgSource: string;

  /**
   * Resize mode of image
   * @default contain
   */
  resizeMode?: keyof typeof FastImage.resizeMode;

  /**
   * Style default for image when imgSource error
   * @default undefined
   */
  styleDefault?: StyleProp<ImageStyle>;
}
