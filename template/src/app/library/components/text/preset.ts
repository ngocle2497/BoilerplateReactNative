import {sizeScale} from '@common';
import {FontDefault} from '@theme/typography';
import {StyleSheet} from 'react-native';
export const textPresets = StyleSheet.create({
  linkTitle: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(24),
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  linkSubtitle: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(20),
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  linkLarge: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(18),
    lineHeight: 34,
    fontWeight: '600',
    color: '#000000',
  },
  linkMedium: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(16),
    lineHeight: 30,
    fontWeight: '600',
    color: '#000000',
  },
  linkSmall: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(14),
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  linkXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(11),
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  linkXXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(9),
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  textMedium: {
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(16),
    lineHeight: 30,
    fontWeight: 'normal',
    color: '#000000',
  },
  textSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(14),
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  textXSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(11),
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  textXXSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(9),
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  default: {},
});

export type TextPresetNames = keyof typeof textPresets;
