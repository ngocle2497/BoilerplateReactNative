import { appReducer, authenticationReducer } from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  app: appReducer,
  authentication: authenticationReducer,
});

export type RootState = ReturnType<typeof allReducer>;
