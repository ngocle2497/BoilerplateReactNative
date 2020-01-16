import { SET_INTERNET_OFF, SET_INTERNET_ON } from './type'

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