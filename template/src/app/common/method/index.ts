/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Platform } from 'react-native';

import { R } from '@assets/value';
import { appActions } from '@redux-slice';
import { remove } from '@storage';

import { dispatch } from '../redux';

type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onShowErrorBase = (msg: string) => {
  Alert.alert(msg);
};
export const onCheckType = (
  source: any,
  type: TypesBase,
): source is TypesBase => {
  return typeof source === type;
};
export const isIos = Platform.OS === 'ios';

export const logout = () => {
  dispatch(appActions.onLogout());
  remove(R.strings.TOKEN);
};
