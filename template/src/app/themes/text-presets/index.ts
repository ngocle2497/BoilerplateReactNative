import { StyleSheet } from 'react-native';

import { FontDefault } from '../typography';

const presets = {
  CTALinks: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 18,
  },
  CTASmall: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 14,
  },
  CTAs: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 16,
  },
  H1: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: 48,
  },
  H2: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: 40,
  },
  H3: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: 36,
  },
  H4: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: 30,
  },
  H5: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: 24,
  },
  assistive: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 1248,
  },
  caption: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 12,
  },
  extraSmall: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 12,
  },
  label: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 12,
  },
  overline: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 10,
  },
  paragraph1: {
    color: '#000000',
    fontFamily: FontDefault.secondary,
    fontSize: 16,
  },
  paragraph2: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 14,
  },
  paragraphBold: {
    color: '#000000',
    fontFamily: FontDefault.primaryBold,
    fontSize: 14,
  },
  placeholder: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: 14,
  },
  quotes: {
    color: '#000000',
    fontFamily: FontDefault.secondaryItalic,
    fontSize: 18,
  },
  subtitle1: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: 20,
  },
  subtitle2: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: 18,
  },
};

export const textPresets = StyleSheet.create(presets);
