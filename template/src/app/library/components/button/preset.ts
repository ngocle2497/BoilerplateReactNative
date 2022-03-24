import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';
import { ColorDefault } from '@theme/color';
import { FontDefault } from '@theme/typography';

export const stylesView = StyleSheet.create({
  primary: {
    borderRadius: 4,
    paddingVertical: 5,
    backgroundColor: ColorDefault.primary,
    alignItems: 'center',
  },

  outline: {
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  default: {},
});
export const stylesText = StyleSheet.create({
  primary: {
    fontSize: sizeScale(16),
    fontFamily: FontDefault.primary,
    fontWeight: '600',
  },

  outline: {
    fontSize: sizeScale(16),
    fontFamily: FontDefault.primary,
    fontWeight: '600',
  },
  default: {},
});

export type ButtonPresetNames = keyof typeof stylesView;
