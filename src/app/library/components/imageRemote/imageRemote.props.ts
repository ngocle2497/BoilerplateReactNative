import { ImageStyle, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image'
export interface ImageRemoteProps extends FastImageProps {

  style?: ImageStyle | ImageStyle[];


  containerStyle?: ViewStyle | ViewStyle[];

  dependency?: any[];

  imgSource: string;

  resizeMode?: keyof typeof FastImage.resizeMode;

  styleDefault?:ImageStyle | ImageStyle[];
}
