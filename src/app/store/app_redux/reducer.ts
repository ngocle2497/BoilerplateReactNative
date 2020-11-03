import {
  DEV_MODE_API,
  PROD_MODE_API,
  STAGING_MODE_API,
} from './../../library/networking/api';
import { AppState } from './type';
import { AppModeType } from '@networking';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from '@config/type';
import { ThemeType } from '@theme';

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: null,
  /**
   * default true to load app
   */
  loading: false,
  theme: 'default',
  appMode: 'dev',
  appUrl: DEV_MODE_API,
};
const appModeToURL = (mode: AppModeType): string => {
  switch (mode) {
    case 'dev':
      return DEV_MODE_API;
    case 'prod':
      return PROD_MODE_API;
    case 'staging':
      return STAGING_MODE_API;
    default:
      return DEV_MODE_API;
  }
};

const appSlice = createSlice({
  name: SLICE_NAME.APP, initialState: initialAppState, reducers: {
    onSetInternet: (state, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload
    },
    onSetToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload
    },
    onSetAppProfile: (state, { payload }: PayloadAction<any>) => {
      state.profile = payload
    },
    onSetAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload
    },
    onLoadApp: (state) => {
      state.loading = true
    },
    onLoadAppEnd: (state) => {
      state.loading = false
    },
    onSetAppMode: (state, { payload }: PayloadAction<AppModeType>) => {
      const appURL = appModeToURL(payload);
      state.appUrl = appURL;
      state.appMode = payload;
    },
    onLogout: (state) => {
      state.token = null;
      state.profile = {};
    }
  }
})
export const appReducer = appSlice.reducer
export const { onLogout, onLoadApp, onLoadAppEnd, onSetAppMode, onSetAppProfile, onSetAppTheme, onSetInternet, onSetToken } = appSlice.actions