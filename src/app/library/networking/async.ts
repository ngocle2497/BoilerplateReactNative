import { StyleSheet } from 'react-native';
import { TIME_OUT } from '@config/index';
import { AppState } from '@app_redux/type';
import { handleResponseAxios, handleErrorAxios } from './helper'
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BASE_API } from './api';
import { useSelector } from 'react-redux';

// base
async function Request(config: AxiosRequestConfig) {
  const { token }: AppState = useSelector((x: any) => x.app);
  const defaultConfig: AxiosRequestConfig = {
    baseURL: BASE_API,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
      token: token
    }
  }
  return Axios.request(StyleSheet.flatten([defaultConfig, config])).then((res: any) => {
    return handleResponseAxios(res)
  }).catch((error: AxiosError) => {
    return handleErrorAxios(error)
  })
}
// get
async function Get(url: string, param?: object) {
  return await Request({ url: url, params: param, method: 'GET' })
}

// post
async function Post(url: string, data: object) {
  return await Request({ url: url, data: data, method: 'POST' })
}

// post file
async function PostWithFile(url: string, data: object) {
  const { token }: AppState = useSelector((x: any) => x.app);
  let header: any = { token: token, 'Content-Type': 'multipart/form-data', };
  return await Request({ url: url, data: data, method: 'POST', headers: header })
}

// put
async function Put(url: string, data: object, params?: object) {
  return await Request({ url: url, data: data, params: params, method: 'PUT' })

}

// delete
async function Delete(url: string, data: object, params?: object) {
  return await Request({ url: url, data: data, params: params, method: 'DELETE', })

}
export const ServiceAsync = {
  Get,
  Post,
  Put,
  Delete,
  PostWithFile,
  Request
};
