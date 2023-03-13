import { Theme, useTheme as useThemeRN } from '@react-navigation/native';
import { ColorDark, ColorDefault } from '@theme/color';

type ColorDefault = typeof ColorDefault;
type ColorDark = typeof ColorDark;

export type Colors = ColorDefault & ColorDark;

export type AppTheme = Theme & { colors: Colors };

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
  const payload = useThemeRN() as AppTheme;

  return payload;
};
