import { ServiceSaga } from '@networking';
import { Action } from 'redux';
import { put, call } from 'redux-saga/effects';
import { actions } from '../redux/reducer';
import { onCheckType } from '@common'

export function* onLogin(action: Action) {
  if (actions.onLogin.match(action)) {
    const { body, onFailure, onSucceeded, url } = action.payload
    yield put(actions.onLoginStart());
    const response = yield ServiceSaga.Post(url, body);
    yield put(actions.onLoginEnd());
    if (response) {
      if (response.data) {
        if (onCheckType(onSucceeded, 'function')) {
          yield call(onSucceeded);
        }
      } else {
        if (onCheckType(onFailure, 'function')) {
          yield call(onFailure, response.msg ?? '');
        }
      }
    }
  }
}
