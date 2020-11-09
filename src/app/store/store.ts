import { allReducer } from './allReducers';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { rootSaga } from './rootSagas';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const devMode = __DEV__;
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({serializableCheck:false}), sagaMiddleware];
if (devMode) {
    middleware.push(logger)
}
const storeConfig = () => {
    const store = configureStore({
        reducer: allReducer,
        devTools: devMode,
        middleware
    });
    sagaMiddleware.run(rootSaga);
    return store;
};
export const store = storeConfig();
