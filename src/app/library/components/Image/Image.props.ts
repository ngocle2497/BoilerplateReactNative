import { ImageStyle, ViewStyle } from 'react-native';
import { ImageTypes } from '../../../assets/image';

export interface ImageProps {

  style?: ImageStyle | ImageStyle[];


  containerStyle?: ViewStyle | ViewStyle[];

  source?: ImageTypes;

}
