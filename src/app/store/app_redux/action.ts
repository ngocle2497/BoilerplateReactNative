import { ThemeType } from '@theme';
<<<<<<< HEAD
import { SET_INTERNET_OFF, SET_INTERNET_ON, SET_TOKEN, LOG_OUT, SET_APP_THEME } from './actionType'
=======
import * as Action from './actionType'
>>>>>>> origin/master

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

<<<<<<< HEAD
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
=======
export const onSetAppTheme = (payload: ThemeType) => ({
    type: Action.SET_APP_THEME,
    payload
})
>>>>>>> origin/master
