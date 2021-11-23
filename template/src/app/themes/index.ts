import {useTheme as useThemeRN} from '@react-navigation/native';
import {AppTheme} from '@config/type';

import {ColorDefault, ColorDark} from './color';

const Default: AppTheme = {
  dark: false,
  colors: ColorDefault,
};
const Dark: AppTheme = {
  dark: true,
  colors: ColorDark,
};
export const MyAppTheme = {
  default: Default,
  dark: Dark,
};

export type ThemeType = keyof typeof MyAppTheme;

export const useTheme = () => {
  const payload: AppTheme = useThemeRN();
  return payload;
};
