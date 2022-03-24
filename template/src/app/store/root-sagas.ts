import { all } from '@typed-redux-saga';

import { appSaga } from './app-saga/index';

import { LoginSaga } from '../features/un-authentication/login/saga/index';

export const rootSaga = function* rootSaga() {
  yield* all([appSaga(), LoginSaga()]);
};
