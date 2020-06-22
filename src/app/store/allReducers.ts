import app from './app_redux/reducer';
import {reducer as formReducer} from 'redux-form';
import login from '../features/unAuthentication/login/redux/reducer';
import {combineReducers} from 'redux-immutable';

export default combineReducers({app, login, form: formReducer});
