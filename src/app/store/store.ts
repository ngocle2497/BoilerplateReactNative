import { createStore, applyMiddleware } from 'redux';
import reducer from './allReducers';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { rootSaga } from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);
export { store };
