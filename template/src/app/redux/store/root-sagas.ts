import { appSaga, loginSaga } from '@saga';
import { all } from '@typed-redux-saga';

export const rootSaga = function* rootSaga() {
  yield* all([appSaga(), loginSaga()]);
};
