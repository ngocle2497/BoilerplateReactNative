import {LOGIN_FAILED, LOGIN_SUCCESS, LoginActionTypes} from './type';
interface LoginState {
  data: any;
  code: number;
  loading: boolean;
  msg: string;
}
const initialState = {
  data: [],
  code: -10,
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
    default:
      return state;
  }
}
