/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from 'react-native';

import { API_CONFIG } from '@common/constant';
import { dispatch, getState } from '@common/redux';
import { API_URL } from '@env';
import { AppState } from '@model/app';
import { appActions } from '@redux-slice/app';
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
      (error?.response?.status === 403 || error?.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      refreshTokenRequest = refreshTokenRequest ?? refreshToken();

      const newToken = await refreshTokenRequest;

      refreshTokenRequest = null;

      if (newToken === null) {
        return Promise.reject(error as Error);
      }

      dispatch(appActions.setToken(newToken));

      originalRequest.headers[tokenKeyHeader] = newToken;

      return AxiosInstance(originalRequest);
    }

    return Promise.reject(error as Error);
  },
);

// refresh token
async function refreshToken(): Promise<any> {
  return new Promise<any>(rs => {
    AxiosInstance.request({
      _retry: true,
      baseURL: API_URL,
      data: {
        refresh_token: '',
      },
      method: 'POST',
      url: ApiConstants.REFRESH_TOKEN,
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
    headers: {
      'Content-Type': 'application/json',
      [tokenKeyHeader]: token ?? '',
    },
    timeout: API_CONFIG.TIME_OUT,
  };

  return new Promise<ResponseBase<T> | null>(rs => {
    AxiosInstance.request(
      StyleSheet.flatten([
        defaultConfig,
        config,
        { signal: config?.signal || controller.current?.signal },
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

        if (result.code === API_CONFIG.RESULT_CODE_PUSH_OUT) {
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
    'Content-Type': 'multipart/form-data',
    [tokenKeyHeader]: token ?? '',
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
  Delete,
  Get,
  Post,
  PostFormData,
  Put,
  Request,
};
