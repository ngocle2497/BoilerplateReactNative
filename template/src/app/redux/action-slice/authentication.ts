/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import { AuthenticationState } from '@model/authentication';
import * as Action from '@redux-action-type/authentication';
import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthenticationState = {
  loading: false,
};

const authenticationSlice = createSlice({
  name: SLICE_NAME.AUTHENTICATION,
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
});

const login = createAction(
  Action.LOGIN,
  (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
    payload: {
      body,
      onSucceeded,
      onFailure,
    },
  }),
);

export const authenticationActions = { ...authenticationSlice.actions, login };

export const authenticationReducer = authenticationSlice.reducer;
