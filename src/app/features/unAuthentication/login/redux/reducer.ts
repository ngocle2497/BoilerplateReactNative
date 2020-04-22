import { CODE_DEFAULT, CODE_SUCCESS } from '../../../../config/index';
import * as Action from './actionType'

export interface LoginState {
    loading: boolean;

}
const initialState: LoginState = {
    loading: false,
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}
export const loginReducer = (state = initialState, { type, payload }: ActionProps): LoginState => {
    switch (type) {
        case Action.LOGIN_START:
            return { ...state, loading: true}
        case Action.LOGIN_SUCCESS:
            return { ...state, loading: false }
        case Action.LOGIN_FAILED:
            return { ...state, loading: false }
        default:
            return state
    }
}
