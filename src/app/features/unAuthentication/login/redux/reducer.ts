import { CODE_DEFAULT } from './../../../../config/index';
import { LoginActionTypes, LoginState } from './type'
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_START } from './actionType';

const initialState = {
  data: {},
  code: CODE_DEFAULT,
  loading: false,
  msg: '',
};

export function LoginReducer(
  state = initialState,
  action: LoginActionTypes,
): LoginState {
  const payload = action.payload;
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        code: payload.code,
      };
    case LOGIN_FAILED:
      return {
        ...state,
      };
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
