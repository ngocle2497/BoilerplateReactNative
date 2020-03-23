import { AppTheme } from './../config/type';
import { StyleSheet } from 'react-native';
import { SpacingDefault } from './spacing';
import { FontSizeDefault } from './fontSize';
import { ColorDefault, ColorLight } from './color';
import { FontDefault } from './typography';

const Default: AppTheme = {
  dark: true,
  colors: ColorDefault,
  spacing:SpacingDefault,
  fontFamily:FontDefault,
  fontSize:FontSizeDefault,
}
const Light: AppTheme = {
  dark: false,
  colors: ColorLight,
  spacing:SpacingDefault,
  fontFamily:FontDefault,
  fontSize:FontSizeDefault,
}
export const MyAppTheme = {
  default: Default,
  light: Light
}

export type ThemeType = keyof typeof MyAppTheme;