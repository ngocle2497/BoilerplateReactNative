/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, ColorValue, Linking, Platform } from 'react-native';

import { processColor } from 'react-native-reanimated';

import { appActions } from '@redux-slice';
import { remove } from '@storage';
import { I18nKeys } from '@utils/i18n/locales';
import { translate } from '@utils/i18n/translate';

import { MMKV_KEY } from '../constant';
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

export const isTypeof = (source: any, type: TypesBase): source is TypesBase => {
  return typeof source === type;
};

export const checkKeyInObject = (T: Record<string, unknown>, key: string) => {
  return Object.keys(T).includes(key);
};

/**
 * return true when success and false when error
 */
export const validResponse = (
  response: ResponseBase<any>,
): response is ResponseBase<any, true> => {
  if (!response.status) {
    // TODO: handle error
    return false;
  }

  return true;
};

export const execFunc = <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
) => {
  if (isTypeof(func, 'function')) {
    func(...args);
  }
};

export const isIos = Platform.OS === 'ios';

export const logout = () => {
  dispatch(appActions.logout());

  remove(MMKV_KEY.APP_TOKEN);
};

export const handleErrorApi = (status: number) => {
  const result = { status: false, code: status, msg: '' };

  if (status > 505) {
    result.msg = translate('error:server_error');

    return result;
  }

  if (status < 500 && status >= 418) {
    result.msg = translate('error:error_on_request');

    return result;
  }

  result.msg = translate(('error:' + status) as I18nKeys);

  return result;
};

export const openLinking = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

export const setAlpha = (color: ColorValue, alpha = 1) => {
  'worklet';
  let num = typeof color === 'number' ? color : processColor(color);

  if (typeof num !== 'number') {
    return color;
  }

  num >>>= 0;

  const b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;
  // a = ((num & 0xff000000) >>> 24) / 255;

  return 'rgba(' + [r, g, b, alpha].join(',') + ')';
};
