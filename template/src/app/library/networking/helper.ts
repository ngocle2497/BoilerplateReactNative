/* eslint-disable @typescript-eslint/no-explicit-any */
import {ParamsNetwork, ResponseBase} from '@config/type';
import {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {
  RESULT_CODE_PUSH_OUT,
  ERROR_NETWORK_CODE,
  STATUS_TIME_OUT,
  CODE_TIME_OUT,
  CODE_SUCCESS,
} from '@config/api';
import {HandleErrorApi, logout, replaceAll} from '@common';

import {translate} from '../utils';
const responseDefault: ResponseBase<any> = {
  code: -500,
  status: false,
  msg: translate('error:errorData'),
  data: {},
};

export const onPushLogout = async () => {
  logout();
  // TODO
  /**
   * do something when logout
   */
};

export const handleResponseAxios = <T>(
  res: AxiosResponse<T>,
): ResponseBase<T> => {
  if (res.data) {
    return {code: CODE_SUCCESS, status: true, data: res.data, msg: null};
  }
  return responseDefault;
};

export const handleErrorAxios = (error: AxiosError): ResponseBase<any> => {
  if (error.code === STATUS_TIME_OUT) {
    // timeout
    return HandleErrorApi(CODE_TIME_OUT);
  }
  if (error.response) {
    if (error.response.status === RESULT_CODE_PUSH_OUT) {
      return HandleErrorApi(RESULT_CODE_PUSH_OUT);
    } else {
      return HandleErrorApi(error.response.status);
    }
  }
  return HandleErrorApi(ERROR_NETWORK_CODE);
};

export const handleQuery = (
  url: string,
  query: {[key: string]: string | number},
) => {
  if (!query || Object.keys(query).length <= 0) {
    return url;
  }
  let resUrl = url;
  Object.keys(query).forEach(k => {
    resUrl = replaceAll(resUrl, `:${k}`, String(query[k]));
  });
  return resUrl;
};

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method,
): AxiosRequestConfig => {
  const {url, body, params, query} = props;
  return {
    ...props,
    method,
    url: handleQuery(url, query),
    data: body,
    params,
  };
};
