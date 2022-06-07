import {
  checkKeyInObject,
  STORAGE_KEY_APP_THEME,
  STORAGE_KEY_TOKEN,
} from '@common';
import { takeLatestListeners } from '@listener';
import { MyAppTheme, ThemeType } from '@theme';
import { loadString } from '@utils/storage';

import { appActions } from '../action-slice/app';

takeLatestListeners()({
  actionCreator: appActions.onLoadApp,
  effect: async (_, listenerApi) => {
    const appTheme = loadString(STORAGE_KEY_APP_THEME);
    const token = loadString(STORAGE_KEY_TOKEN);
    if (typeof token === 'string') {
      listenerApi.dispatch(appActions.onSetToken(token));
    }

    if (
      typeof appTheme === 'string' &&
      checkKeyInObject(MyAppTheme, appTheme)
    ) {
      listenerApi.dispatch(appActions.onSetAppTheme(appTheme as ThemeType));
    }
    listenerApi.dispatch(appActions.onLoadAppEnd());
  },
});
