import { StyleSheet } from 'react-native';
import { FontDefault } from '@theme/typography';
import { ColorDefault } from '@theme/color';
import { FontSizeDefault } from '@theme/fontSize';

export const styles = StyleSheet.create({
  default: {
    fontFamily: FontDefault.primary,
    color: ColorDefault.text,
    fontSize: FontSizeDefault.FONT_15,
  },
  bold: {
    fontFamily: FontDefault.primary,
    color: ColorDefault.text,
    fontSize: FontSizeDefault.FONT_15,
    fontWeight: 'bold'
  },
  header: {
    fontFamily: FontDefault.primary,
    color: ColorDefault.text,
    fontSize: FontSizeDefault.FONT_24,
    fontWeight: 'bold'
  },
  fieldLabel: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_13,
    color: ColorDefault.lighterGrey
  },
  secondary: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_9,
    color: ColorDefault.lighterGrey
  }
})

export type TextPresets = keyof typeof styles;
