import { DEV_MODE_API, PROD_MODE_API, STAGING_MODE_API } from './../../library/networking/api';
import { BaseRedux } from '@config/type';
import * as Action from './actionType';
import { AppState, App_Mode } from './type';
import { fromJS } from 'immutable'
const initialAppState: AppState = {
    internetState: true,
    profile: {},
    token: null,
    theme: 'default',
    appMode: 'prod',
    appUrl: DEV_MODE_API
};
const appModeToURL = (mode: App_Mode): string => {
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
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}
export default (state: BaseRedux<AppState> = fromJS(initialAppState), { type, payload }: ActionProps): BaseRedux<AppState> => {
    switch (type) {
        case Action.SET_INTERNET_ON:
            return state.set('internetState', true);
        case Action.SET_INTERNET_OFF:
            return state.set('internetState', false);
        case Action.SET_TOKEN:
            return state.set('token', payload);
        case Action.SET_APP_PROFILE:
            return state.set('profile', payload);
        case Action.SET_APP_THEME:
            return state.set('theme', payload);
        case Action.SET_APP_MODE:
            const appURL = appModeToURL(payload)
            return state.set('appMode', payload).set('appUrl', appURL);
        case Action.LOG_OUT:
            let saveState = initialAppState;
            saveState.appMode = state.get('appMode')
            saveState.appUrl = state.get('appUrl')
            return fromJS(saveState);
        default:
            return state;
    }
};