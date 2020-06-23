import {FontFamily as FontType} from './../config/type';
import {Platform} from 'react-native';

export const FontDefault: FontType = {
  primary: Platform.select({ios: 'Roboto-Medium', android: 'Roboto-Medium'}),
  secondary: Platform.select({ios: 'Roboto-Medium', android: 'Roboto-Medium'}),
};
export type FontFamily = keyof typeof FontDefault;
