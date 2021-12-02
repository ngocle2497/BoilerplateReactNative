import {ColorDefault} from '@theme/color';
import {StyleSheet} from 'react-native';
const DIMENSIONS = {width: 16, height: 16};
export const styles = StyleSheet.create({
  ROOT: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  OUTLINE: {
    ...DIMENSIONS,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.primary,
    borderRadius: 1,
  },
  FILL: {
    width: DIMENSIONS.width - 4,
    height: DIMENSIONS.height - 4,
    backgroundColor: ColorDefault.primary,
  },
  LABEL: {
    paddingLeft: 8,
  },
});
