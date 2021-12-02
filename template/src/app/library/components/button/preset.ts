import {ColorDefault} from '@theme/color';
import {StyleSheet} from 'react-native';

export const stylesView = StyleSheet.create({
  primary: {
    borderRadius: 4,
    paddingVertical: 5,
    backgroundColor: ColorDefault.primary,
    alignItems: 'center',
  },
  none: {
    alignItems: 'center',
    width: '100%',
  },
  outline: {
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  default: {},
});

export type ButtonPresetNames = keyof typeof stylesView;
