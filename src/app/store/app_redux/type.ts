import { ThemeType } from './../../themes/index';
export interface AppState {
    internetState: boolean;
    profile: any;
    token: any | undefined | null;
    theme:ThemeType;
  }