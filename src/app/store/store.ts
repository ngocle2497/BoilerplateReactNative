import { createStore, applyMiddleware } from 'redux';
import reducer from './allReducers';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import saga from './rootSaga';

const logger = createLogger({
    collapsed: true,
    stateTransformer: (state: any) => state.toJS(),
    errorTransformer: (state: any) => state.toJS(),
    duration: true
})
const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(saga);
export { store };
