import {ResponseBase} from '../../../../config/type';
import {LoginRequestViewModel} from '../../../../data/model/request/index.js';
import {LoginResponseViewModel} from '../../../../data/model/response';

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN = 'LOGIN';

export interface onLogin {
  type: typeof LOGIN;
  payload: LoginRequestViewModel;
}

export interface onLoginFailed {
  type: typeof LOGIN_FAILED;
  payload: ResponseBase<LoginResponseViewModel>;
}

export interface onLoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: ResponseBase<LoginResponseViewModel>;
}

export type LoginActionTypes = onLoginSuccess | onLoginFailed;
