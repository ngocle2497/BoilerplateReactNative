import { ThemeType } from '@theme';
export interface AppState {
    internetState: boolean;
    profile: any;
    token: any | undefined | null;
    theme:ThemeType;
  }