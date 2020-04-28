import { ImageStyle, ViewStyle } from 'react-native';
import { IconTypes } from '../../../assets/icon';

export interface IconProps {

  style?: ImageStyle | ImageStyle[];


  containerStyle?: ViewStyle | ViewStyle[];

  icon?: IconTypes;

}
