import {StyleSheet} from 'react-native';
import {ColorDefault} from '@theme/color';
import {SpacingDefault} from '@theme/spacing';

const RADIUS = 8;
export const styles = StyleSheet.create({
  top: {
    borderWidth: 1,
    borderColor: ColorDefault.border,
    padding: SpacingDefault.smaller,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    borderBottomWidth: 0,
  },
  middle: {
    borderWidth: 1,
    borderColor: ColorDefault.border,
    padding: SpacingDefault.smaller,
    borderBottomWidth: 0,
  },
  bottom: {
    borderWidth: 1,
    borderColor: ColorDefault.border,
    padding: SpacingDefault.smaller,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
  soloRound: {
    borderWidth: 1,
    borderColor: ColorDefault.border,
    padding: SpacingDefault.smaller,
    borderRadius: RADIUS,
  },
  soloStraight: {
    borderWidth: 1,
    borderColor: ColorDefault.border,
    padding: SpacingDefault.smaller,
  },
  clear: {
    borderWidth: 1,
    borderColor: ColorDefault.border,
    padding: SpacingDefault.smaller,
  },
});

export type FormRowPresets = keyof typeof styles;
