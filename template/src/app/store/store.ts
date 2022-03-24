import { subscribeActionMiddleware } from '@common';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { allReducer } from './all-reducers';
import { rootSaga } from './root-sagas';
/**
 * Use this instead storage of reduxPersist
 *
 */
// import {persistStore, persistReducer} from 'redux-persist';
//  import {reduxPersistStorage} from '@utils';
// const persistedReducer = persistReducer(
//   {key: 'root', storage: reduxPersistStorage},
//   allReducer,
// );
const devMode = __DEV__;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, subscribeActionMiddleware];

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
// export const persistore = persistStore(store);
