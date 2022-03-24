import { R } from '@assets/value';
import { checkKeyInObject } from '@common';
import { MyAppTheme, ThemeType } from '@theme';
import { all, call, put } from '@typed-redux-saga';
import { loadString } from '@utils';

import { onLoadAppEnd, onSetAppTheme, onSetToken } from '../app-redux/reducer';

export function* onLoadAppModeAndTheme() {
  const { appTheme, token } = yield* all({
    appTheme: call(loadString, R.strings.APP_THEME),
    token: call(loadString, R.strings.TOKEN),
  });

  if (typeof token === 'string') {
    yield* put(onSetToken(token));
  }

  if (typeof appTheme === 'string' && checkKeyInObject(MyAppTheme, appTheme)) {
    yield* put(onSetAppTheme(appTheme as ThemeType));
  }
  yield* put(onLoadAppEnd());
}
