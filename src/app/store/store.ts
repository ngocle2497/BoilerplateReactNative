import {createStore, applyMiddleware} from 'redux';
import {allReducer} from './allReducers';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {rootSaga} from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);
export {store};
