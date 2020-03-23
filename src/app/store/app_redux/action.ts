import { ThemeType } from './../../themes/index';
import { SET_INTERNET_OFF, SET_INTERNET_ON, SET_TOKEN, REMOVE_TOKEN, SET_APP_THEME } from './actionType'

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
export const onRemoveToken = () => {
    return {
        type: REMOVE_TOKEN,
    };
};

export const onSetAppTheme = (payload:ThemeType)=>{
    return{
        type: SET_APP_THEME,
        payload
    }
}