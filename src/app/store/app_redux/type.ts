import {ThemeType} from '@theme';
export type App_Mode = 'prod' | 'staging' | 'dev';
export interface AppState {
  internetState: boolean;
  profile: any;
  token: any | undefined | null;
  theme: ThemeType;
  appMode: App_Mode;
  appUrl: string;
}
