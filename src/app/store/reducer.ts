import {combineReducers} from 'redux';
import {LoginReducer} from '../features/unAuthentication/login/redux/reducer';
const initialAppState = {
  internetState: true,
};
const AppReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'SET_INTERNET':
      return {...state, internetState: true};
    case 'SET_NO_INTERNET':
      return {...state, internetState: false};
    default:
      return state;
  }
};
export default combineReducers({AppReducer, LoginReducer});
