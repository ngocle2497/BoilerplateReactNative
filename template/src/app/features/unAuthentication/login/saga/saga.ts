import {onCheckType} from '@common';
import {ApiConstants, ServiceSaga} from '@networking';
import {Action} from 'redux';
import {call, put} from 'redux-saga/effects';

import {actions} from '../redux/reducer';

export function* onLogin(action: Action) {
  if (actions.onLogin.match(action)) {
    const {body, onFailure, onSucceeded} = action.payload;
    yield put(actions.onStart());
    const response = yield* ServiceSaga.Post({url: ApiConstants.LOGIN, body});
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
