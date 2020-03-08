import { CODE_DEFAULT, CODE_SUCCESS } from '../../../../config/index';
import * as Action from './actionType'

export interface LoginState {
    loading: boolean;
    error: string | undefined | null;
}
const initialState: LoginState = {
    loading: false,
    error: null
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}
export const loginReducer = (state = initialState, { type, payload }: ActionProps): LoginState => {
    switch (type) {
        case Action.LOGIN_START:
            return { ...state, loading: true, error: null }
        case Action.LOGIN_SUCCESS:
            return { ...state, loading: false }
        case Action.LOGIN_FAILED:
            return { ...state, loading: false, error: payload.error }
        default:
            return state
    }
}
