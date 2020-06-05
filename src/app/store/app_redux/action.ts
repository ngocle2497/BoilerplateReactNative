import { ThemeType } from '@theme';
import * as Action from './actionType'

export const onInternetOff = () => ({
    type: Action.SET_INTERNET_OFF,
});

export const onInternetOn = () => ({
    type: Action.SET_INTERNET_ON,
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