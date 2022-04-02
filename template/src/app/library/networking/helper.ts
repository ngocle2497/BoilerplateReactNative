import { HandleErrorApi, logout, replaceAll } from '@common';
import {
  CODE_SUCCESS,
  CODE_TIME_OUT,
  ERROR_NETWORK_CODE,
  RESULT_CODE_PUSH_OUT,
  STATUS_TIME_OUT,
} from '@config/api';
import { ParamsNetwork, ResponseBase } from '@config/type';
import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { translate } from '../utils';
const responseDefault: ResponseBase<Record<string, unknown>> = {
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
    return { code: CODE_SUCCESS, status: true, data: res.data, msg: null };
  }
  return responseDefault as ResponseBase<T>;
};

export const handleErrorAxios = (error: AxiosError): ResponseBase => {
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
export const handleQuery = (url: string, query: ParamsNetwork['query']) => {
  if (!query || Object.keys(query).length <= 0) {
    return url;
  }
  let resUrl = url;
  Object.keys(query).forEach(k => {
    resUrl = replaceAll(resUrl, `:${k}`, String(query[k]));
  });
  return resUrl;
};

export const handlePath = (url: string, path: ParamsNetwork['path']) => {
  if (!path || Object.keys(path).length <= 0) {
    return url;
  }
  let resUrl = url;
  Object.keys(path).forEach(k => {
    resUrl = replaceAll(resUrl, `{${k}}`, String(path[k]));
  });
  return resUrl;
};

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method,
): AxiosRequestConfig => {
  const { url, body, path, params, query } = props;
  const resQuery = handleQuery(url, query);
  return {
    ...props,
    method,
    url: handlePath(resQuery, path),
    data: body,
    params,
  };
};
