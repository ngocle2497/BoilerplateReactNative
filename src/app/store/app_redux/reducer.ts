import { BaseRedux } from '@config/type';
import * as Action from './actionType';
import { AppState } from './type';
import { fromJS } from 'immutable'
import { DEV_MODE_API } from '@networking';
const initialAppState: AppState = {
    internetState: true,
    profile: {},
    token: null,
    theme: 'default',
    appMode: 'prod',
    appUrl: DEV_MODE_API
};

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
            return state.set('appMode', payload);
        case Action.SET_APP_URL:
            return state.set('appUrl', payload);
        case Action.LOG_OUT:
            let saveState = initialAppState;
            saveState.appMode = state.get('appMode')
            saveState.appUrl = state.get('appUrl')
            return fromJS(saveState);
        default:
            return state;
    }
};