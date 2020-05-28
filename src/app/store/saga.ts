import { all } from 'redux-saga/effects';
import { LoginSaga } from '../features/unAuthentication/login/saga/index';

const rootSaga = function* rootSaga() {
  yield all([LoginSaga()]);
};
export default rootSaga;
