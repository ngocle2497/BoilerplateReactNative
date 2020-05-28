import { StyleSheet } from 'react-native'
import { SpacingDefault } from '@theme/spacing';
import { ColorDefault } from '@theme/color';
import { FontSizeDefault } from '@theme/fontSize';
export const stylesView = StyleSheet.create({
  primary: {
    paddingVertical: SpacingDefault.smaller,
    paddingHorizontal: SpacingDefault.smaller,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorDefault.button,
  },
  link: {
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'flex-start',
  }
})

export const stylesText = StyleSheet.create({
  primary: {
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_9,
    color: ColorDefault.white,
  },
  link: {
    fontSize: FontSizeDefault.FONT_9,
    color: ColorDefault.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  }
})
export type ButtonPresetNames = keyof typeof stylesView;
