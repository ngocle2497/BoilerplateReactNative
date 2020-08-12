import {HandleErrorApi} from '@common';
import {StyleSheet} from 'react-native';
import {TIME_OUT, RESULT_CODE_PUSH_OUT, CODE_TIME_OUT} from '@config';
import {AppState} from '@app_redux/type';
import {race, delay, select} from 'redux-saga/effects';
import {handleResponseAxios, handleErrorAxios, _onPushLogout} from './helper';
import Axios, {AxiosError, AxiosRequestConfig} from 'axios';

// base
function* Request(config: AxiosRequestConfig, isCheckOut = true) {
  const {token, appUrl}: AppState = yield select((x: any) => x.app);
  const defaultConfig: AxiosRequestConfig = {
    baseURL: appUrl,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  };
  const {timeout, result} = yield race({
    timeout: delay(TIME_OUT),
    result: Axios.request(StyleSheet.flatten([defaultConfig, config]))
      .then((res: any) => {
        const result = handleResponseAxios(res);
        if (!isCheckOut) {
          return result;
        }
        if (result.code === RESULT_CODE_PUSH_OUT) {
          _onPushLogout();
        } else {
          return result;
        }
      })
      .catch((error: AxiosError) => {
        const result = handleErrorAxios(error);
        if (!isCheckOut) {
          return result;
        }
        if (result.code === RESULT_CODE_PUSH_OUT) {
          _onPushLogout();
        } else {
          return result;
        }
      }),
  });
  if (timeout) {
    return HandleErrorApi(CODE_TIME_OUT);
  }
  return result;
}

// get
function* Get(url: string, param?: object) {
  return yield Request({url: url, params: param, method: 'GET'});
}

// post
function* Post(url: string, data: object) {
  return yield Request({url: url, data: data, method: 'POST'});
}

// post file
function* PostWithFile(url: string, data: object) {
  const {token}: AppState = yield select((x: any) => x.toJS().app);
  let header: any = {token: token, 'Content-Type': 'multipart/form-data'};
  return yield Request({url: url, data: data, method: 'POST', headers: header});
}

// put
function* Put(url: string, data: object, params?: object) {
  return yield Request({url: url, data: data, params: params, method: 'PUT'});
}

// delete
function* Delete(url: string, data: object, params?: object) {
  return yield Request({
    url: url,
    data: data,
    params: params,
    method: 'DELETE',
  });
}
export const ServiceSaga = {
  Get,
  Post,
  Put,
  Delete,
  PostWithFile,
  Request,
};
