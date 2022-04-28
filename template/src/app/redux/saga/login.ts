import { ApiConstants, NetWorkResponseType, NetWorkService } from '@networking';
import { appActions, loginActions } from '@redux-slice';
import { call, put, takeLatest } from '@typed-redux-saga';
import { Action } from 'redux';

export function* loginSaga() {
  yield* takeLatest(loginActions.onLogin.type, onLogin);
}

function* onLogin(action: Action) {
  if (loginActions.onLogin.match(action)) {
    const { body } = action.payload;
    yield* put(appActions.onStartProcess());
    const response = yield* call<NetWorkResponseType<unknown>>(
      NetWorkService.Post,
      {
        url: ApiConstants.LOGIN,
        body,
      },
    );
    yield* put(appActions.onEndProcess());
    if (!response) {
      return;
    }
  }
}
