import * as Action from './actionType'
export const onLogin = (url: string, payload: any, onSuccess?: () => void, onFailure?: (msg: string) => void) => ({
    type: Action.LOGIN,
    url,
    payload,
    onSuccess,
    onFailure
})
export const onLoginSuccess = (payload: any) => ({
    type: Action.LOGIN_SUCCESS,
    payload
})
export const onLoginFailure = () => ({
    type: Action.LOGIN_FAILED
})
export const onLoginStart = () => ({
    type: Action.LOGIN_START
})