import * as Action from './actionType';
import {produce} from 'immer';
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
export default produce((state: LoginState, {type, payload}: ActionProps) => {
  switch (type) {
    case Action.LOGIN_START:
      state.loading = true;
      break;
    case Action.LOGIN_SUCCESS:
      state.loading = false;
      break;
    case Action.LOGIN_FAILED:
      state.loading = false;
      break;
  }
}, initialState);
