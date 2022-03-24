import { takeLatest } from '@typed-redux-saga';

import * as Saga from './saga';

import { actions } from '../redux/reducer';
export function* LoginSaga() {
  yield* takeLatest(actions.onLogin.type, Saga.onLogin);
}
