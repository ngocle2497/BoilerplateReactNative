/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@common/constant';
import { AuthenticationState } from '@model/authentication';
import * as Action from '@redux-action-type/authentication';
import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthenticationState = {
  loading: false,
};

const authenticationSlice = createSlice({
  initialState: initialState,
  name: SLICE_NAME.AUTHENTICATION,
  reducers: {
    reset: () => initialState,
  },
});

const login = createAction(
  Action.LOGIN,
  (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
    payload: {
      body,
      onFailure,
      onSucceeded,
    },
  }),
);

export const authenticationActions = { ...authenticationSlice.actions, login };

export const authenticationReducer = authenticationSlice.reducer;
