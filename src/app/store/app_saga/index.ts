import { takeLatest } from 'redux-saga/effects';
import * as Saga from './saga';
import { onLoadApp } from '../app_redux/reducer';
export function* appSaga() {
  yield takeLatest(onLoadApp.type, Saga.onLoadAppModeAndTheme);
}
