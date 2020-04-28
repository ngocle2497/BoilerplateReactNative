import { fork } from 'redux-saga/effects';
import { LoginSaga } from '../features/unAuthentication/login/saga/index';
const rootSaga = function* rootSaga() {
  yield fork(LoginSaga);
};
export default rootSaga;
