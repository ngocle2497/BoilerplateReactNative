import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, applyMiddleware(sagaMiddleware,logger));

sagaMiddleware.run(saga);
export {store};
