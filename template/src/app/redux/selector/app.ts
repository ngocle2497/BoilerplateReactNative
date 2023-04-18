import { RootState } from "@store/all-reducers";
import { createSelector } from "@reduxjs/toolkit";

export const selectAppConfig = createSelector(
  (state: RootState) => state.app,
  (app) => ({
    loadingApp: app.loadingApp,
    showDialog: app.showDialog,
    theme: app.theme,
  })
);

export const selectAppToken = createSelector(
  (state: RootState) => state.app,
  (app) => app.token
);
