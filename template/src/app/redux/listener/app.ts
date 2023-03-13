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
  actionCreator: appActions.startLoadApp,
  effect: async (_, listenerApi) => {
    const appTheme = loadString(STORAGE_KEY_APP_THEME);

    const token = loadString(STORAGE_KEY_TOKEN);

    if (typeof token === 'string') {
      listenerApi.dispatch(appActions.setToken(token));
    }

    if (
      typeof appTheme === 'string' &&
      checkKeyInObject(MyAppTheme, appTheme)
    ) {
      listenerApi.dispatch(appActions.setAppTheme(appTheme as ThemeType));
    }

    listenerApi.dispatch(appActions.endLoadApp());
  },
});
