import { ServiceSaga } from '../../../../library/networking/index';
import { put } from 'redux-saga/effects';
import { ResponseBase, RequestBase } from '../../../../config/type';
import { onLoginFailed, onLoginSuccess } from '../redux/action';
import { LoginRequest } from '../../../../data/model/request';
import { LoginResponse } from '../../../../data/model/response';
export function* onLogin(action: RequestBase<LoginRequest>) {
  const response: ResponseBase<LoginResponse> = yield ServiceSaga.Post(action.url, action.data);

  if (response.status) {
    yield put(onLoginSuccess(response));
  } else {
    yield put(onLoginFailed(response));
  }
}
