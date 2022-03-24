import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app-redux/reducer';

import { loginReducer } from '../features/un-authentication/login/redux/reducer';

export const allReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof allReducer>;
