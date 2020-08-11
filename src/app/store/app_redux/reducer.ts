import {
  DEV_MODE_API,
  PROD_MODE_API,
  STAGING_MODE_API,
} from './../../library/networking/api';
import * as Action from './actionType';
import { AppState } from './type';
import { AppModeType } from '@networking'
import { produce, current } from 'immer'

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: null,
  /**
   * default true to load app
   */
  loading: true,
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
interface ActionProps {
  type: keyof typeof Action;
  payload: any;
}
export default
  produce((draftState: AppState, { type, payload }: ActionProps) => {
    switch (type) {
      case Action.SET_INTERNET:
        draftState.internetState = payload;
        break;
      case Action.SET_TOKEN:
        draftState.token = payload;
        break;
      case Action.SET_APP_PROFILE:
        draftState.profile = payload;
        break;
      case Action.SET_APP_THEME:
        draftState.theme = payload;
        break;
      case Action.LOAD_APP_END:
        draftState.loading = false;
        break;
      case Action.SET_APP_MODE:
        const appURL = appModeToURL(payload);
        draftState.appUrl = appURL;
        draftState.appMode = payload;
        break;
      case Action.LOG_OUT:
        const currentState = current(draftState)
        return { ...initialAppState, appMode: currentState.appMode, appUrl: currentState.appUrl }
    }
  }, initialAppState)


