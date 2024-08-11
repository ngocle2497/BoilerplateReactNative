import { SLICE_NAME } from '@common/constant';
import { AppState } from '@model/app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialAppState: AppState = {
  /**
   * default true to load app
   */
  loadingApp: false,

  profile: {},

  token: undefined,
};

const appSlice = createSlice({
  initialState: initialAppState,
  name: SLICE_NAME.APP,
  reducers: {
    endLoadApp: state => {
      state.loadingApp = false;
    },
    logout: state => {
      state.token = undefined;

      state.profile = {};
    },
    setAppProfile: (state, { payload }: PayloadAction<unknown>) => {
      state.profile = payload;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    startLoadApp: state => {
      state.loadingApp = true;
    },
  },
});

export const { reducer: appReducer, actions: appActions } = appSlice;
