/* eslint-disable @typescript-eslint/no-explicit-any */
import {ThemeType} from '@theme';
import {AppModeType} from '@networking';
export interface AppState {
  internetState: boolean;

  profile: any;

  token: any | undefined | null;

  loadingApp: boolean;

  showDialog: boolean;

  theme: ThemeType;

  appMode: AppModeType;

  appUrl: string;
}
