import {ServiceAsync} from '../../../../library/networking/index';
import {put, takeLatest} from 'redux-saga/effects';
import {ResponseBase, RequestBase} from '../../../../config/type';
import {onLoginFailed, onLoginSuccess} from '../redux/action';
import {LoginRequestViewModel} from '../../../../data/model/request';
import {LoginResponseViewModel} from '../../../../data/model/response';
export function* onLogin(action: RequestBase<LoginRequestViewModel>) {
  const response: ResponseBase<
    LoginResponseViewModel
  > = yield ServiceAsync.Post<LoginResponseViewModel>(action.url, action.data);
  if (response.status) {
    yield put(onLoginSuccess(response));
  } else {
    yield put(onLoginFailed(response));
  }
}
