import { SLICE_NAME } from '@config/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@theme';

import { AppState } from './type';

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: undefined,
  /**
   * default true to load app
   */
  loadingApp: false,
  showDialog: false,
  theme: 'default',
};
const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    onSetInternet: (state, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    onSetToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    onSetAppProfile: (state, { payload }: PayloadAction<unknown>) => {
      state.profile = payload;
    },
    onSetAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload;
    },
    onLoadApp: state => {
      state.loadingApp = true;
    },
    onLoadAppEnd: state => {
      state.loadingApp = false;
    },
    onStartProcess: state => {
      state.showDialog = true;
    },
    onEndProcess: state => {
      state.showDialog = false;
    },
    onLogout: state => {
      state.token = undefined;
      state.profile = {};
    },
  },
});
export const appReducer = appSlice.reducer;
export const {
  onLogout,
  onStartProcess,
  onEndProcess,
  onLoadApp,
  onLoadAppEnd,
  onSetAppProfile,
  onSetAppTheme,
  onSetInternet,
  onSetToken,
} = appSlice.actions;
