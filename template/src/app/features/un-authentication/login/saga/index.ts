import {takeLatest} from '@typed-redux-saga';

import {actions} from '../redux/reducer';

import * as Saga from './saga';
export function* LoginSaga() {
  yield* takeLatest(actions.onLogin.type, Saga.onLogin);
}
