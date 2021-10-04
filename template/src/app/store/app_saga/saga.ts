import {all, call, put} from 'redux-saga/effects';
import {loadString} from '@utils';
import {R} from '@assets/value';
import {AppModeType, APP_MODE_URL} from '@networking';
import {ThemeType, MyAppTheme} from '@theme';
import {checkKeyInObject} from '@common';

import {
  onLoadAppEnd,
  onSetAppMode,
  onSetAppTheme,
  onSetToken,
} from '../app_redux/reducer';

export function* onLoadAppModeAndTheme() {
  const {appMode, appTheme, token} = yield all({
    appMode: call(loadString, R.strings.APP_MODE),
    appTheme: call(loadString, R.strings.APP_MODE),
    token: call(loadString, R.strings.TOKEN),
  });

  if (typeof token === 'string') {
    yield put(onSetToken(token));
  }
  if (typeof appMode === 'string' && checkKeyInObject(APP_MODE_URL, appMode)) {
    yield put(onSetAppMode(appMode as AppModeType));
  }
  if (typeof appTheme === 'string' && checkKeyInObject(MyAppTheme, appTheme)) {
    yield put(onSetAppTheme(appTheme as ThemeType));
  }
  yield put(onLoadAppEnd());
}
