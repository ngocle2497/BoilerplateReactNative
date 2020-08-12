import app from './app_redux/reducer';
import login from '../features/unAuthentication/login/redux/reducer';
import {combineReducers} from 'redux';

export const allReducer = combineReducers({app, login});

export type RootState = ReturnType<typeof allReducer>;
