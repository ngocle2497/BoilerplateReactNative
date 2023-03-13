/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeType } from '@theme';

export interface AppState {
  internetState: boolean;

  profile: any;

  token: string | undefined;

  loadingApp: boolean;

  showDialog: boolean;

  theme: ThemeType;
}
