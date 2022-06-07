import { subscribeActionMiddleware } from '@common';
import { configureStore } from '@reduxjs/toolkit';
import { allReducer } from '@store/all-reducers';

import { listenerMiddleware } from '../listener';

/**
 * Use this instead storage of reduxPersist
 * import {persistStore, persistReducer} from 'redux-persist';
 * import {reduxPersistStorage} from '@utils';
 * const persistedReducer = persistReducer(
 *   {key: 'root', storage: reduxPersistStorage},
 *   allReducer,
 * );
 */

const devMode = __DEV__;
const middleware = [subscribeActionMiddleware];

export const store = configureStore({
  reducer: allReducer,
  devTools: devMode,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(listenerMiddleware.middleware)
      .concat(middleware),
});
/**
 * export const persistore = persistStore(store);
 */
