import { FontFamily } from './../config/type';
import {Platform} from 'react-native';

export const FontDefault :FontFamily={
  primary: Platform.select({ios: 'Roboto-Medium', android: 'Roboto-Medium'}),
  secondary: Platform.select({ios: 'Roboto-Medium', android: 'Roboto-Medium'}),
}