import {LOGIN} from '../redux/type';
import * as Saga from './saga';
import {takeLatest} from 'redux-saga/effects';
export function* LoginSaga() {
  yield takeLatest(LOGIN, Saga.onLogin);
}
