import { ThemeType } from '@theme';
import { SET_INTERNET_OFF, SET_INTERNET_ON, SET_TOKEN, LOG_OUT, SET_APP_THEME } from './actionType'

export const onInternetOff = () => {
    return {
        type: SET_INTERNET_OFF,
    };
};

export const onInternetOn = () => {
    return {
        type: SET_INTERNET_ON,
    };
};

export const onSetToken = (payload:any) => {
    return {
        type: SET_TOKEN,
        payload
    };
};
export const onLogout = () => {
    return {
        type: LOG_OUT,
    };
};

export const onSetAppTheme = (payload:ThemeType)=>{
    return{
        type: SET_APP_THEME,
        payload
    }
}