import { ResponseBase } from '../../../../config/type';
import { LoginRequestViewModel } from '../../../../data/model/request/index.js';
import { LoginResponse } from '../../../../data/model/response';

import { LOGIN, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionType';

export interface LoginState {
  data: any;
  code: number;
  loading: boolean;
  msg: string;
}

export interface onLogin {
  type: typeof LOGIN;
  payload: LoginRequestViewModel;
}

export interface onLoginFailed {
  type: typeof LOGIN_FAILED;
  payload: ResponseBase<LoginResponse>;
}

export interface onLoginStart {
  type: typeof LOGIN_START;
  payload: ResponseBase<LoginResponse>;
}

export interface onLoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: ResponseBase<LoginResponse>;
}

export type LoginActionTypes = onLoginSuccess | onLoginFailed | onLoginStart;
