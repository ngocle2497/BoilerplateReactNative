import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';
import { ColorDefault } from '@theme/color';

const WIDTH_OTP = 32;

const HEIGHT_OTP = 40;

export const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpView: {
    width: WIDTH_OTP,
    height: HEIGHT_OTP,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.border,
  },
  otpViewActive: {
    borderColor: ColorDefault.primary,
  },
  otpText: {
    fontSize: sizeScale(14),
    color: ColorDefault.primary,
    textAlignVertical: 'bottom',
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    // width: '100%',
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    height: HEIGHT_OTP,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    color: 'transparent',
    opacity: 0,
  },
});
