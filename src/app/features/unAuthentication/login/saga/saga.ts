import { ServiceSaga } from '../../../../library/networking/index';
import { put } from 'redux-saga/effects';
import * as Action from '../redux/actionType'
export function* onLogin({ url, payload }: { url: string, payload: any }) {
  const response = yield ServiceSaga.Post(url, payload);
  if (response.data) {
    yield put({ type: Action.LOGIN_SUCCESS, payload: response.data })
  } else {
    yield put({ type: Action.LOGIN_FAILED, payload: { error: response.error } })
  }
}
