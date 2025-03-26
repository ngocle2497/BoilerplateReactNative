import { AppState } from '@stores/app';

export const selectAppLoading = (state: AppState) => ({
  loadingApp: state.loadingApp,
});

export const selectAppToken = (state: AppState) => state.token;
