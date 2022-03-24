import { takeLatest } from '@typed-redux-saga';

import * as Saga from './saga';

import { onLoadApp } from '../app-redux/reducer';
export function* appSaga() {
  yield* takeLatest(onLoadApp.type, Saga.onLoadAppModeAndTheme);
}
