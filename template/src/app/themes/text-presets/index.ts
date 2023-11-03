import { StyleSheet } from 'react-native';

import { sizeScale } from '@common/scale';

import { FontDefault } from '../typography';

const presets = {
  caption: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(12),
  },
  overline: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(10),
  },
  H1: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: sizeScale(48),
  },
  H2: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: sizeScale(40),
  },
  H3: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: sizeScale(36),
  },
  H4: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: sizeScale(30),
  },
  H5: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: sizeScale(24),
  },
  subtitle1: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: sizeScale(20),
  },
  subtitle2: {
    color: '#000000',
    fontFamily: FontDefault.primarySemiBold,
    fontSize: sizeScale(18),
  },
  paragraph1: {
    color: '#000000',
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(16),
  },
  paragraph2: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(14),
  },
  paragraphBold: {
    color: '#000000',
    fontFamily: FontDefault.primaryBold,
    fontSize: sizeScale(14),
  },
  quotes: {
    color: '#000000',
    fontFamily: FontDefault.secondaryItalic,
    fontSize: sizeScale(18),
  },
  label: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(12),
  },
  placeholder: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(14),
  },
  assistive: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(1248),
  },
  CTAs: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(16),
  },
  CTALinks: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(18),
  },
  CTASmall: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(14),
  },
  extraSmall: {
    color: '#000000',
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(12),
  },
};

export const textPresets = StyleSheet.create(presets);
