import {subscribeActionMiddleware} from '@common';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import {rootSaga} from './rootSagas';
import {allReducer} from './allReducers';
/**
 * Use this instead storage of reduxPersist
 *
 */
// import { reduxPersistStorage } from '@utils'
// const persistConfig = {
//     ...
//     storage: reduxPersistStorage
//   }
const devMode = __DEV__;
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({serializableCheck: false}),
  sagaMiddleware,
  subscribeActionMiddleware,
];
if (devMode) {
  middleware.push(logger);
}
const storeConfig = () => {
  const store = configureStore({
    reducer: allReducer,
    devTools: devMode,
    middleware,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
export const store = storeConfig();
