import {all} from '@typed-redux-saga';

import {LoginSaga} from '../features/un-authentication/login/saga/index';

import {appSaga} from './app-saga/index';

export const rootSaga = function* rootSaga() {
  yield* all([appSaga(), LoginSaga()]);
};
