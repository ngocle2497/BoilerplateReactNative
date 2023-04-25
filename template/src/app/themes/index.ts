import { Theme, useTheme as useThemeRN } from '@react-navigation/native';

import { ColorDefault } from './colors/default';
import { FontDefault } from './typography/default';

export { FontDefault } from './typography/default';

type ColorDefaultType = typeof ColorDefault;

export type Colors = ColorDefaultType;

export type AppTheme = Theme & { colors: Colors };

const Default: AppTheme = {
  dark: false,
  colors: ColorDefault,
};

export const MyAppTheme = {
  default: Default,
};

export type ThemeType = keyof typeof MyAppTheme;

export const useTheme = () => {
  const payload = useThemeRN() as AppTheme;

  return payload;
};

export type FontFamily = keyof typeof FontDefault;
