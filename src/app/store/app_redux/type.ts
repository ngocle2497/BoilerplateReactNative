export const SET_INTERNET_OFF = 'SET_INTERNET_OFF';
export const SET_INTERNET_ON = 'SET_INTERNET_ON';


export interface AppState {
    internetState: boolean;
    profile: any;
    token: any;
}
export interface onSetInternetOff {
    type: typeof SET_INTERNET_OFF;
}

export interface onSetInternetOn {
    type: typeof SET_INTERNET_ON;
}

export type AppActionTypes = onSetInternetOff | onSetInternetOn;