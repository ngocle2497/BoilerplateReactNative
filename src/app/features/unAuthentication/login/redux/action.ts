import { RequestBase, ResponseBase, ActionBase } from './../../../../config/type';
import { LOGIN_FAILED, LOGIN, LOGIN_SUCCESS } from './actionType';
import { LoginRequestViewModel } from '../../../../data/model/request/index.js';
import { LoginResponse } from '../../../../data/model/response';

export const onLogin = (
  action: RequestBase<LoginRequestViewModel>,
): ActionBase<LoginRequestViewModel> => {
  return {
    type: LOGIN,
    payload: { userName: action.data.userName, password: action.data.password },
  };
};

export const onLoginSuccess = (
  action: ResponseBase<LoginResponse>,
): ActionBase<LoginResponse> => {
  return { type: LOGIN_SUCCESS, payload: action.data };
};

export const onLoginFailed = (
  action: ResponseBase<LoginResponse>,
): ActionBase<LoginResponse> => {
  return { type: LOGIN_FAILED, payload: action.data };
};
