import { Theme, useTheme as useThemeRN } from '@react-navigation/native';

import { ColorDefault } from './colors/default';
import { MediumPresets } from './text-presets/medium';
import { FontDefault } from './typography/default';
export type { TextPresetsType } from './text-presets/type';
export { ColorDefault } from './colors/default';

export { FontDefault } from './typography/default';

// Color
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

// Font Family
export type FontFamily = keyof typeof FontDefault;

// Text Style
export const SystemPresets = {
  medium: MediumPresets,
} as const;

export const useTextPreset = () => {
  /// TODO
  // use this when you need to change the preset of text
  // // state
  // const preset = useSelector(selectAppPreset);
  // // result
  // return useMemo(() => SystemPresets[preset], [preset]);
};

export type AppPreset = keyof typeof SystemPresets;
