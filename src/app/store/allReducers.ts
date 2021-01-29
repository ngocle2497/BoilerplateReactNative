import {combineReducers} from "@reduxjs/toolkit";

import {loginReducer} from "../features/unAuthentication/login/redux/reducer";

import {appReducer} from "./app_redux/reducer";

export const allReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof allReducer>;
