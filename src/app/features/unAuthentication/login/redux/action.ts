import * as Action from './actionType'
export const onLogin = (url: string, payload: any) => ({
    type: Action.LOGIN,
    url,
    payload
})
