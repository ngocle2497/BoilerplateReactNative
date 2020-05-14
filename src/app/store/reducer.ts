import * as Action from './app_redux/actionType';
import { AppState } from './app_redux/type';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { loginReducer } from '../features/unAuthentication/login/redux/reducer';
import { BaseRedux } from '../config/type';

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: null,
  theme: 'default'
};

interface ActionProps {
  type: keyof typeof Action;
  payload: any;
}
const AppReducer = (state: BaseRedux<AppState> = fromJS(initialAppState), { type, payload }: ActionProps): BaseRedux<AppState> => {
  switch (type) {
    case Action.SET_INTERNET_ON:
      return state.set('internetState', true);
    case Action.SET_INTERNET_OFF:
      return state.set('internetState', false);
    case Action.SET_TOKEN:
      return state.set('token', payload);
    case Action.REMOVE_TOKEN:
      return state.set('token', null);
    case Action.SET_APP_THEME:
      return state.set('theme', payload);
    default:
      return state;
  }
};
export default combineReducers({ app: AppReducer, login: loginReducer, form: formReducer });
