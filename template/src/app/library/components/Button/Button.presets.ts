import {StyleSheet} from 'react-native';
import {SpacingDefault} from '@theme/spacing';
import {ColorDefault} from '@theme/color';
import {FontSizeDefault} from '@theme/fontSize';

export const stylesView = StyleSheet.create({
  primary: {
    paddingVertical: SpacingDefault.smaller,
    paddingHorizontal: SpacingDefault.smaller,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebf2f1',
  },
  link: {
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export const stylesText = StyleSheet.create({
  primary: {
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_9,
    color: '#FFFFFF',
  },
  link: {
    fontSize: FontSizeDefault.FONT_9,
    color: ColorDefault.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
export type ButtonPresetNames = keyof typeof stylesView;
