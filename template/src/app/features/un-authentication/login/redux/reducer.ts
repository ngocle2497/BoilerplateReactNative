/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import { createAction, createSlice } from '@reduxjs/toolkit';

import * as Action from './actionType';
export interface LoginState {
  loading: boolean;
  count: number;
}
const initialState: LoginState = {
  loading: false,
  count: 0,
};
const loginSlice = createSlice({
  name: SLICE_NAME.LOGIN,
  initialState: initialState,
  reducers: {
    reset: () => {
      return { ...initialState };
    },
    onStart: () => {
      /// TODO
    },
  },
});
const onLogin = createAction(
  Action.LOGIN,
  (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
    payload: {
      body,
      onSucceeded,
      onFailure,
    },
  }),
);
export const actions = { ...loginSlice.actions, onLogin };
export const loginReducer = loginSlice.reducer;
