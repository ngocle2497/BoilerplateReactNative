import {takeLatest} from 'redux-saga/effects';
import * as Saga from './saga';
import * as Action from '../app_redux/actionType';
export function* appSaga() {
  yield takeLatest(Action.LOAD_APP, Saga.onLoadAppModeAndTheme);
}
