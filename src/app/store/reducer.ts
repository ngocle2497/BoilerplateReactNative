import * as Action from './app_redux/actionType';
import { AppState } from './app_redux/type';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { loginReducer } from '../features/unAuthentication/login/redux/reducer';

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: null,
};
interface ActionProps {
  type: keyof typeof Action;
  payload: any;
}
const AppReducer = (state = initialAppState, { type, payload }: ActionProps): AppState => {
  switch (type) {
    case Action.SET_INTERNET_ON:
      return { ...state, internetState: true };
    case Action.SET_INTERNET_OFF:
      return { ...state, internetState: false };
    case Action.SET_TOKEN:
      return { ...state, token: payload }
    case Action.REMOVE_TOKEN:
      return { ...state, token: null }
    default:
      return state;
  }
};
export default combineReducers({ app: AppReducer, login: loginReducer, form: formReducer });
