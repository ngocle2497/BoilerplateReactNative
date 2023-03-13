/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from 'react-native';

import { dispatch, getState } from '@common';
import { RESULT_CODE_PUSH_OUT, TIME_OUT } from '@config/api';
import { ParamsNetwork } from '@config/type';
import { API_URL } from '@env';
import { AppState } from '@model/app';
import { appActions } from '@redux-slice';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiConstants } from './api';
import {
  controller,
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
        : refreshToken();

      const newToken = await refreshTokenRequest;

      refreshTokenRequest = null;

      if (newToken === null) {
        return Promise.reject(error);
      }

      dispatch(appActions.setToken(newToken));

      originalRequest.headers[tokenKeyHeader] = newToken;

      return AxiosInstance(originalRequest);
    }

    return Promise.reject(error);
  },
);

// refresh token
async function refreshToken(): Promise<any | null> {
  return new Promise<any | null>(rs => {
    AxiosInstance.request({
      method: 'POST',
      url: ApiConstants.REFRESH_TOKEN,
      _retry: true,
      baseURL: API_URL,
      data: {
        refresh_token: '',
      },
    } as AxiosRequestConfig)
      .then((res: AxiosResponse<any>) => rs(res.data))
      .catch(() => rs(null));
  });
}

// base
function Request<T = Record<string, unknown>>(config: ParamsNetwork) {
  const { token }: AppState = getState('app');

  const defaultConfig: AxiosRequestConfig = {
    baseURL: API_URL,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
      [tokenKeyHeader]: token ?? '',
    },
  };

  return new Promise<ResponseBase<T> | null>(rs => {
    AxiosInstance.request(
      StyleSheet.flatten([
        defaultConfig,
        config,
        { signal: config?.controller?.signal || controller.current?.signal },
      ]),
    )
      .then((res: AxiosResponse<T>) => {
        const result = handleResponseAxios(res);

        rs(result);
      })
      .catch((error: AxiosError<T>) => {
        if (error.code === AxiosError.ERR_CANCELED) {
          rs(null);
        }

        const result = handleErrorAxios(error);

        if (result.code === RESULT_CODE_PUSH_OUT) {
          onPushLogout();

          rs(null);
        } else {
          rs(result as ResponseBase<T>);
        }
      });
  });
}

// get
async function Get<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'GET'));
}

// post
async function Post<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'POST'));
}

type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork;
// post FormData
async function PostFormData<T>(params: ParamsNetwork) {
  const { token }: AppState = getState('app');

  const headers: AxiosRequestConfig['headers'] = {
    [tokenKeyHeader]: token ?? '',
    'Content-Type': 'multipart/form-data',
  };

  return Request<T>(
    handleParameter<ParameterPostFormData>({ ...params, headers }, 'POST'),
  );
}

// put
async function Put<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'PUT'));
}

// delete
async function Delete<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'DELETE'));
}

export type NetWorkResponseType<T> = (
  params: ParamsNetwork,
) => Promise<ResponseBase<T> | null>;

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request,
};
