import { ThemeType } from '@theme';
import * as Action from './actionType'
import { App_Mode } from './type';

export const onInternet = (payload: boolean) => ({
    type: Action.SET_INTERNET,
    payload
});
export const onLogout = () => ({
    type: Action.LOG_OUT
})
export const onSetToken = (payload: any) => ({
    type: Action.SET_TOKEN,
    payload
});
export const onAppProfile = (payload: any) => ({
    type: Action.SET_APP_PROFILE,
    payload
});

export const onSetAppTheme = (payload: ThemeType) => ({
    type: Action.SET_APP_THEME,
    payload
})
export const onSetAppMode = (payload: App_Mode) => ({
    type: Action.SET_APP_MODE,
    payload
})
