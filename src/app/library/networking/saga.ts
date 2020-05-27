import { StyleSheet } from 'react-native';
import { TIME_OUT } from '@config';
import { AppState } from '@app_redux/type';
import { handleResponseAxios, handleErrorAxios } from './helper'
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BASE_API } from './api';
import { select } from 'redux-saga/effects'

// base
function* Request(config: AxiosRequestConfig) {
  const { token }: AppState = yield select((x) => x.toJS().app);
  const defaultConfig: AxiosRequestConfig = {
    baseURL: BASE_API,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
      token: token
    }
  }
  return yield Axios.request(StyleSheet.flatten([defaultConfig, config])).then((res: any) => {
    return handleResponseAxios(res)
  }).catch((error: AxiosError) => {
    return handleErrorAxios(error)
  })
}

// get
function* Get(url: string, param?: object) {
  return yield Request({ url: url, params: param, method: 'GET' })
}

// post
function* Post(url: string, data: object) {
  return yield Request({ url: url, data: data, method: 'POST' })
}

// post file
function* PostWithFile(url: string, data: object) {
  const { token }: AppState = yield select(x => x.app);
  let header: any = { token: token, 'Content-Type': 'multipart/form-data', };
  return yield Request({ url: url, data: data, method: 'POST', headers: header })
}

// put
function* Put(url: string, data: object, params?: object) {
  return yield Request({ url: url, data: data, params: params, method: 'PUT' })

}

// delete
function* Delete(url: string, data: object, params?: object) {
  return yield Request({ url: url, data: data, params: params, method: 'DELETE' })

}
export const ServiceSaga = {
  Get,
  Post,
  Put,
  Delete,
  PostWithFile,
  Request
};
