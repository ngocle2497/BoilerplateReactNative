import { fonts } from '@assets/fonts';
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
    icons: fonts.icons,
    [FontDefault.primary]: fonts.manrope_medium,
    [FontDefault.primaryBold]: fonts.manrope_bold,
    [FontDefault.primarySemiBold]: fonts.manrope_semibold,
    [FontDefault.secondary]: fonts.roboto_regular,
    [FontDefault.secondaryItalic]: fonts.roboto_italic,
  });

  return isLoaded;
};
