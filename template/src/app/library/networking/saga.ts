/* eslint-disable @typescript-eslint/no-explicit-any */
import {AppState} from '@store/app-redux/type';
import {dispatch} from '@common';
import {RESULT_CODE_PUSH_OUT, TIME_OUT} from '@config/api';
import {ParamsNetwork, ResponseBase} from '@config/type';
import {RootState} from '@store/all-reducers';
import {onSetToken} from '@store/app-redux/reducer';
import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {StyleSheet} from 'react-native';
import {select} from 'redux-saga/effects';

import {ApiConstants} from './api';
import {
  handleErrorAxios,
  handleParameter,
  handleResponseAxios,
  onPushLogout,
} from './helper';

const tokenKeyHeader = 'authorization';
let refreshTokenRequest: Promise<string | null> | null = null;
const AxiosInstance = Axios.create({});

AxiosInstance.interceptors.response.use(
  response => response,
  async function (error) {
    const originalRequest = error.config;
    if (
      error &&
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : refreshToken(originalRequest);
      const newToken = await refreshTokenRequest;
      refreshTokenRequest = null;
      if (newToken === null) {
        return Promise.reject(error);
      }
      dispatch(onSetToken(newToken));
      originalRequest.headers[tokenKeyHeader] = newToken;
      return AxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

// refresh token
async function refreshToken(originalRequest: any) {
  return AxiosInstance.get(ApiConstants.REFRESH_TOKEN, originalRequest)
    .then((res: AxiosResponse) => res.data)
    .catch(() => null);
}

// base
function* Request<T = unknown>(
  config: AxiosRequestConfig,
  isCheckOut = true,
): Generator<unknown, ResponseBase<T>, any> {
  const {token, appUrl}: AppState = yield select((x: any) => x.app);
  const defaultConfig: AxiosRequestConfig = {
    baseURL: appUrl,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
      [tokenKeyHeader]: token ?? '',
    },
  };
  return yield AxiosInstance.request(
    StyleSheet.flatten([defaultConfig, config]),
  )
    .then((res: AxiosResponse<T>) => {
      const result = handleResponseAxios(res);
      return result;
    })
    .catch((error: AxiosError) => {
      const result = handleErrorAxios(error);
      if (!isCheckOut) {
        return result;
      }
      if (result.code === RESULT_CODE_PUSH_OUT && isCheckOut) {
        onPushLogout();
        return null;
      } else {
        return result;
      }
    });
}

// get
function* Get<T>(
  params: ParamsNetwork,
): Generator<unknown, ResponseBase<T>, any> {
  return yield Request<T>(handleParameter(params, 'GET'));
}

// post
function* Post<T>(
  params: ParamsNetwork,
): Generator<unknown, ResponseBase<T>, any> {
  return yield Request<T>(handleParameter(params, 'POST'));
}

type ParameterPostFile = AxiosRequestConfig & ParamsNetwork;
// post file
function* PostWithFile<T>(
  params: ParamsNetwork,
): Generator<unknown, ResponseBase<T>, any> {
  const {token}: AppState = yield select((x: RootState) => x.app);
  const headers: AxiosRequestConfig['headers'] = {
    token: token ?? '',
    'Content-Type': 'multipart/form-data',
  };
  return yield Request<T>(
    handleParameter<ParameterPostFile>({...params, headers}, 'POST'),
  );
}

// put
function* Put<T>(
  params: ParamsNetwork,
): Generator<unknown, ResponseBase<T>, any> {
  return yield Request<T>(handleParameter(params, 'PUT'));
}

// delete
function* Delete<T>(
  params: ParamsNetwork,
): Generator<unknown, ResponseBase<T>, any> {
  return yield Request<T>(handleParameter(params, 'DELETE'));
}
export const ServiceSaga = {
  Get,
  Post,
  Put,
  Delete,
  PostWithFile,
  Request,
};
