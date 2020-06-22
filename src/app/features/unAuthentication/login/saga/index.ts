import {put, takeLatest, call} from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* LoginSaga() {
  yield takeLatest(Action.LOGIN, Saga.onLogin);
}
