import { FontFamily } from './../config/type';
import {Platform} from 'react-native';

export const FontDefault :FontFamily={
  primary: Platform.select({ios: 'Montserrat', android: 'Montserrat'}),
  secondary: Platform.select({ios: 'Montserrat', android: 'Montserrat'}),
}