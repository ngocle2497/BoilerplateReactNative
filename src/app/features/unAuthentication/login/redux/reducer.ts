import * as Action from './actionType';
import {fromJS} from 'immutable';
import {BaseRedux} from 'src/app/config/type';
export interface LoginState {
  loading: boolean;
}
const initialState: LoginState = {
  loading: false,
};
interface ActionProps {
  type: keyof typeof Action;
  payload: any;
}
export default (
  state: BaseRedux<LoginState> = fromJS(initialState),
  {type, payload}: ActionProps,
): BaseRedux<LoginState> => {
  switch (type) {
    case Action.LOGIN_START:
      return state.set('loading', true);
    case Action.LOGIN_SUCCESS:
      return state.set('loading', false);
    case Action.LOGIN_FAILED:
      return state.set('loading', false);
    default:
      return state;
  }
};
