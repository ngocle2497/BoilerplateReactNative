import * as Action from './actionType';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from '@config/type';
export interface LoginState {
  loading: boolean;
  count: number;
}
const initialState: LoginState = {
  loading: false,
  count: 0
};
const loginSlice = createSlice({
  name: SLICE_NAME.LOGIN,
  initialState: initialState,
  reducers: {
    onLoginStart: (state) => {
      state.loading = true;

    },
    onLoginEnd: (state) => {
      state.loading = false
    },
    reset: () => {
      return { ...initialState }
    }
  }
})
const onLogin = createAction(Action.LOGIN, (url: string, body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
  payload: {
    url,
    body,
    onSucceeded,
    onFailure
  }
}))
export const actions = { ...loginSlice.actions, onLogin }
export const loginReducer = loginSlice.reducer