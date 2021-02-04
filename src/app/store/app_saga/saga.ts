import {all, put} from 'redux-saga/effects';
import {loadString} from '@utils';
import {R} from '@assets/value';
import {AppModeType, APP_MODE_URL} from '@networking';
import {ThemeType, MyAppTheme} from '@theme';
import {checkKeyInObject} from '@common';

import {onLoadAppEnd, onSetAppMode, onSetAppTheme} from '../app_redux/reducer';

export function* onLoadAppModeAndTheme() {
  const {appMode, appTheme} = yield all({
    appMode: loadString(R.strings.APP_MODE),
    appTheme: loadString(R.strings.APP_THEME),
  });
  if (typeof appMode === 'string' && checkKeyInObject(APP_MODE_URL, appMode)) {
    yield put(onSetAppMode(appMode as AppModeType));
  }
  if (typeof appTheme === 'string' && checkKeyInObject(MyAppTheme, appTheme)) {
    yield put(onSetAppTheme(appTheme as ThemeType));
  }
  yield put(onLoadAppEnd());
}
