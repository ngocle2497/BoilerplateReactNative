/* eslint-disable import/extensions */

import { useFonts } from 'expo-font';

export const FontDefault = {
  primary: 'primary',
  primaryBold: 'primaryBold',
  primarySemiBold: 'primarySemiBold',
  secondary: 'secondary',
  secondaryItalic: 'secondaryItalic',
} as const;

export const useLoadFont = () => {
  // state
  const [isLoaded] = useFonts({
    // icons is default font for react native vector icons. flowing IcMoon to use icons
    icons: require('@assets/fonts/icons.ttf'),
    [FontDefault.primary]: require('@assets/fonts/Manrope-Medium.ttf'),
    [FontDefault.primaryBold]: require('@assets/fonts/Manrope-Bold.ttf'),
    [FontDefault.primarySemiBold]: require('@assets/fonts/Manrope-SemiBold.ttf'),
    [FontDefault.secondary]: require('@assets/fonts/Roboto-Regular.ttf'),
    [FontDefault.secondaryItalic]: require('@assets/fonts/Roboto-Italic.ttf'),
  });

  return isLoaded;
};
