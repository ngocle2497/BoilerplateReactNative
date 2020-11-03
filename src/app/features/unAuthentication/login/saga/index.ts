import { takeLatest, } from 'redux-saga/effects';
import { actions } from '../redux/reducer'
import * as Saga from './saga';
export function* LoginSaga() {
  yield takeLatest(actions.onLogin.type, Saga.onLogin);
}
