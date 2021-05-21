import {Alert, Platform} from 'react-native';
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
export const onCheckType = (source: any, type: TypesBase) => {
  return typeof source === type;
};
export const isIos = Platform.OS === 'ios';
