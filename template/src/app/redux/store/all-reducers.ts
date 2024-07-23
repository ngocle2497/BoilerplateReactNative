import { appReducer } from '@redux-slice/app';
import { authenticationReducer } from '@redux-slice/authentication';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  app: appReducer,
  authentication: authenticationReducer,
});

export type RootState = ReturnType<typeof allReducer>;
