import {RequestBase, ResponseBase, ActionBase} from './../../../../config/type';
import {LOGIN_FAILED, LOGIN, LOGIN_SUCCESS} from './type';
import {LoginRequestViewModel} from '../../../../data/model/request/index.js';
import {LoginResponseViewModel} from '../../../../data/model/response';

export const onLogins = (
  action: RequestBase<LoginRequestViewModel>,
): ActionBase<LoginRequestViewModel> => {
  return {
    type: LOGIN,
    payload: {password: action.data.password, userName: action.data.userName},
  };
};

export const onLoginSuccess = (
  action: ResponseBase<LoginResponseViewModel>,
): ActionBase<LoginResponseViewModel> => {
  return {type: LOGIN_SUCCESS, payload: action.data};
};

export const onLoginFailed = (
  action: ResponseBase<LoginResponseViewModel>,
): ActionBase<LoginResponseViewModel> => {
  return {type: LOGIN_FAILED, payload: action.data};
};
