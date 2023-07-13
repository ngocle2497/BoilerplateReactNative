/* eslint-disable import/extensions */

import { useFonts } from 'expo-font';

export const FontDefault = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

export const useLoadFont = () => {
  // state
  const [isLoaded] = useFonts({
    // icons is default font for react native vector icons. flowing IcMoon to use icons
    icons: require('@assets/fonts/icons.ttf'),
    [FontDefault.primary]: require('@assets/fonts/Roboto-Medium.ttf'),
    [FontDefault.secondary]: require('@assets/fonts/Roboto-Medium.ttf'),
  });

  return isLoaded;
};
