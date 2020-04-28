import * as Action from './actionType';
import { AppState } from './type';
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
export const AppReducer = (state = initialAppState, { type, payload }: ActionProps): AppState => {
    switch (type) {
        case Action.SET_INTERNET_ON:
            return { ...state, internetState: true };
        case Action.SET_INTERNET_OFF:
            return { ...state, internetState: false };
        case Action.SET_TOKEN:
            return { ...state, token: payload }
        case Action.REMOVE_TOKEN:
            return { ...state, token: null }
        case Action.SET_APP_THEME:
            return { ...state, theme: payload }
        default:
            return state;
    }
};