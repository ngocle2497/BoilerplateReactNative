import { all } from 'redux-saga/effects';
import { appSaga } from './app_saga/index'
import { LoginSaga } from '../features/unAuthentication/login/saga/index';

export const rootSaga = function* rootSaga() {
  yield all([appSaga(), LoginSaga()]);
};
