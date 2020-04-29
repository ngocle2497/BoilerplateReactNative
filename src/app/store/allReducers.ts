
import { AppReducer } from './app_redux/reducer'
import { reducer as formReducer } from 'redux-form'
import { loginReducer } from '../features/unAuthentication/login/redux/reducer';
import { combineReducers } from 'redux-immutable';
export default combineReducers({ app: AppReducer, login: loginReducer, form: formReducer });
