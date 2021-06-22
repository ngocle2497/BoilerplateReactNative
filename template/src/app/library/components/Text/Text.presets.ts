import {FontSizeDefault} from '@theme/fontSize';
import {FontDefault} from '@theme/typography';
import {StyleSheet} from 'react-native';
export const textPresets = StyleSheet.create({
  linkTitle: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_24,
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  linkSubtitle: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_20,
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  linkLarge: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_18,
    lineHeight: 34,
    fontWeight: '600',
    color: '#000000',
  },
  linkMedium: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_16,
    lineHeight: 30,
    fontWeight: '600',
    color: '#000000',
  },
  linkSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  linkXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_11,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  linkXXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_9,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  textMedium: {
    fontFamily: FontDefault.secondary,
    fontSize: FontSizeDefault.FONT_16,
    lineHeight: 30,
    fontWeight: 'normal',
    color: '#000000',
  },
  textSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: FontSizeDefault.FONT_14,
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  textXSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: FontSizeDefault.FONT_11,
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  textXXSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: FontSizeDefault.FONT_9,
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  default: {},
});

export type TextPresetNames = keyof typeof textPresets;
