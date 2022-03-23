import { combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from '../features/un-authentication/login/redux/reducer';
import { appReducer } from './app-redux/reducer';

export const allReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof allReducer>;
