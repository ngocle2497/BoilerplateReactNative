import { configureStore } from '@reduxjs/toolkit';
import { allReducer } from '@store/all-reducers';
import reduxDebugger from 'redux-flipper';

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

const middleware = [] as any[];

if (devMode) {
  middleware.push(reduxDebugger());
}

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
