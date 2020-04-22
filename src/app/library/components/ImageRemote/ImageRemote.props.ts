import { ImageStyle, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image'
export interface ImageRemoteProps {

  style?: ImageStyle | ImageStyle[];


  containerStyle?: ViewStyle | ViewStyle[];

  dependency?: any[];

  imgSource: string;

  resizeMode?: keyof typeof FastImage.resizeMode;

  styleDefault?:ImageStyle | ImageStyle[];
}
