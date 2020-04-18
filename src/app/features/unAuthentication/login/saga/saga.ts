import { ServiceSaga } from '../../../../library/networking/index';
import { put, call } from 'redux-saga/effects';
import { onLoginStart, onLoginFailure, onLoginSuccess } from '../redux/action'
export function* onLogin({ url, payload, onFailure, onSuccess }: { url: string, payload: any, onSuccess?: () => void, onFailure?: (msg: string) => void }) {
  yield put(onLoginStart())
  const response = yield ServiceSaga.Post(url, payload);
  if (response.data) {
    yield put(onLoginSuccess(response))
    if (onSuccess) {
      yield call(onSuccess)
    }
  } else {
    yield put(onLoginFailure())
    if (onFailure) {
      yield call(onFailure, response.msg ?? '')
    }
  }
}
