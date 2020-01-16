import { AppState, AppActionTypes, SET_INTERNET_OFF, SET_INTERNET_ON } from './app_redux/type';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { LoginReducer } from '../features/unAuthentication/login/redux/reducer';

const initialAppState = {
  internetState: true,
  profile: {},
  token: null,
};
const AppReducer = (state = initialAppState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case SET_INTERNET_ON:
      return { ...state, internetState: true };
    case SET_INTERNET_OFF:
      return { ...state, internetState: false };
    default:
      return state;
  }
};
export default combineReducers({ AppReducer, LoginReducer, form: formReducer });
