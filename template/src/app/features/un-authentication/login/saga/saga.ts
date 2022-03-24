import { ApiConstants, NetWorkResponseType, NetWorkService } from '@networking';
import { onEndProcess, onStartProcess } from '@store/app-redux/reducer';
import { call, put } from '@typed-redux-saga';
import { Action } from 'redux';

import { actions } from '../redux/reducer';

export function* onLogin(action: Action) {
  if (actions.onLogin.match(action)) {
    const { body } = action.payload;
    yield* put(onStartProcess());
    const response = yield* call<NetWorkResponseType<unknown>>(
      NetWorkService.Post,
      {
        url: ApiConstants.LOGIN,
        body,
      },
    );
    yield* put(onEndProcess());
    if (response) {
      /// TODO
    }
  }
}
