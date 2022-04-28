/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import { LoginState } from '@model/login';
import * as Action from '@redux-action-type/login';
import { createAction, createSlice } from '@reduxjs/toolkit';

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
      console.log('onStart');
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
export const loginActions = { ...loginSlice.actions, onLogin };
export const loginReducer = loginSlice.reducer;
