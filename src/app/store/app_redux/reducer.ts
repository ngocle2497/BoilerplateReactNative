import { BaseRedux } from '../../config/type';
import * as Action from './actionType';
import { AppState } from './type';
import { fromJS } from 'immutable'
const initialAppState: AppState = {
    internetState: true,
    profile: {},
    token: null,
    theme: 'default'
};

interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}
export const AppReducer = (state: BaseRedux<AppState> = fromJS(initialAppState), { type, payload }: ActionProps): BaseRedux<AppState> => {
    switch (type) {
        case Action.SET_INTERNET_ON:
            return state.set('internetState', true);
        case Action.SET_INTERNET_OFF:
            return state.set('internetState', false);
        case Action.SET_TOKEN:
            return state.set('token', payload);
        case Action.REMOVE_TOKEN:
            return state.set('token', null);
        case Action.SET_APP_THEME:
            return state.set('theme', payload);
        default:
            return state;
    }
};