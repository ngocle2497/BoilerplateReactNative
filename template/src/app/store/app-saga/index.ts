import {takeLatest} from '@typed-redux-saga';

import {onLoadApp} from '../app-redux/reducer';

import * as Saga from './saga';
export function* appSaga() {
  yield* takeLatest(onLoadApp.type, Saga.onLoadAppModeAndTheme);
}
