import { appReducer, loginReducer } from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof allReducer>;
