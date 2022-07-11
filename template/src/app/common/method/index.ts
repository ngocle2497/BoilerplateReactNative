/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Platform } from 'react-native';

import { ERROR_NETWORK_CODE } from '@config/api';
import { ResponseBase } from '@config/type';
import { appActions } from '@redux-slice';
import { remove } from '@storage';
import { translate } from '@utils/i18n/translate';

import { STORAGE_KEY_TOKEN } from '../constant';
import { dispatch } from '../redux';
import { sizeScale } from '../scale';

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
export const checkKeyInObject = (T: Record<string, unknown>, key: string) => {
  return Object.keys(T).includes(key);
};

export const propsToStyle = <T = Record<string, number | string>>(
  arrStyle: Array<T>,
) => {
  return arrStyle
    .filter(
      x => x !== undefined && !Object.values(x).some(v => v === undefined),
    )
    .reduce((prev: Record<string, number | string>, curr) => {
      const firstKey = Object.keys(curr)[0] as keyof T;
      const firstValue = curr[firstKey];

      if (
        !['opacity', 'zIndex', 'flex'].includes(firstKey as string) &&
        typeof firstValue === 'number'
      ) {
        (curr[firstKey] as unknown as number) = sizeScale(firstValue);
      }
      return { ...prev, ...curr };
    }, {} as Record<string, number | string>);
};

/**
 * return true when success and false when error
 */
 export const handleErrorResponse = (
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
  if (onCheckType(func, 'function')) {
    func(...args);
  }
};

export const isIos = Platform.OS === 'ios';

export const logout = () => {
  dispatch(appActions.logout());
  remove(STORAGE_KEY_TOKEN);
};

const handleData = (responseError: ResponseBase<null>) => {
  return responseError;
};

export const handleErrorApi = (status: number) => {
  switch (status) {
    case ERROR_NETWORK_CODE:
      return handleData({
        code: ERROR_NETWORK_CODE,
        msg: translate('error:errorNetwork'),
        data: null,
        status: false,
      });
    case 200:
      return handleData({
        code: status,
        msg: translate('error:0'),
        data: null,
        status: false,
      });
    case 400:
      return handleData({
        code: status,
        msg: translate('error:400'),
        data: null,
        status: false,
      });
    case 401:
      return handleData({
        code: status,
        msg: translate('error:401'),
        data: null,
        status: false,
      });
    case 402:
      return handleData({
        code: status,
        msg: translate('error:402'),
        data: null,
        status: false,
      });
    case 403:
      return handleData({
        code: status,
        msg: translate('error:403'),
        data: null,
        status: false,
      });
    case 404:
      return handleData({
        code: status,
        msg: translate('error:404'),
        data: null,
        status: false,
      });
    case 405:
      return handleData({
        code: status,
        msg: translate('error:405'),
        data: null,
        status: false,
      });
    case 406:
      return handleData({
        code: status,
        msg: translate('error:406'),
        data: null,
        status: false,
      });
    case 407:
      return handleData({
        code: status,
        msg: translate('error:407'),
        data: null,
        status: false,
      });
    case 408:
      return handleData({
        code: status,
        msg: translate('error:408'),
        data: null,
        status: false,
      });

    case 409:
      return handleData({
        code: status,
        msg: translate('error:409'),
        data: null,
        status: false,
      });
    case 410:
      return handleData({
        code: status,
        msg: translate('error:410'),
        data: null,
        status: false,
      });

    case 411:
      return handleData({
        code: status,
        msg: translate('error:411'),
        data: null,
        status: false,
      });
    case 412:
      return handleData({
        code: status,
        msg: translate('error:412'),
        data: null,
        status: false,
      });

    case 413:
      return handleData({
        code: status,
        msg: translate('error:413'),
        data: null,
        status: false,
      });
    case 414:
      return handleData({
        code: status,
        msg: translate('error:414'),
        data: null,
        status: false,
      });
    case 415:
      return handleData({
        code: status,
        msg: translate('error:415'),
        data: null,
        status: false,
      });
    case 416:
      return handleData({
        code: status,
        msg: translate('error:416'),
        data: null,
        status: false,
      });
    case 417:
      return handleData({
        code: status,
        msg: translate('error:417'),
        data: null,
        status: false,
      });
    case 500:
      return handleData({
        code: status,
        msg: translate('error:500'),
        data: null,
        status: false,
      });
    case 501:
      return handleData({
        code: status,
        msg: translate('error:501'),
        data: null,
        status: false,
      });
    case 502:
      return handleData({
        code: status,
        msg: translate('error:502'),
        data: null,
        status: false,
      });
    case 503:
      return handleData({
        code: status,
        msg: translate('error:503'),
        data: null,
        status: false,
      });
    case 504:
      return handleData({
        code: status,
        msg: translate('error:504'),
        data: null,
        status: false,
      });
    case 505:
      return handleData({
        code: status,
        msg: translate('error:505'),
        data: null,
        status: false,
      });

    default:
      if (status > 503) {
        return handleData({
          code: status,
          msg: translate('error:serverError'),
          data: null,
          status: false,
        });
      } else if (status < 500 && status >= 400) {
        return handleData({
          code: status,
          msg: translate('error:errorOnRequest'),
          data: null,
          status: false,
        });
      } else {
        return handleData({
          code: status,
          msg: translate('error:errorOnHandle'),
          data: null,
          status: false,
        });
      }
  }
};
