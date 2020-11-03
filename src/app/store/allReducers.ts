import { appReducer } from './app_redux/reducer';
import { loginReducer } from '../features/unAuthentication/login/redux/reducer';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({ app: appReducer, login: loginReducer });

export type RootState = ReturnType<typeof allReducer>;
