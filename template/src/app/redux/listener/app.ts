import { MMKV_KEY } from '@common';
import { takeLatestListeners } from '@listener';
import { loadString } from '@utils/storage';

import { appActions } from '../action-slice/app';

takeLatestListeners()({
  actionCreator: appActions.startLoadApp,
  effect: async (_, listenerApi) => {
    const token = loadString(MMKV_KEY.APP_TOKEN);

    if (typeof token === 'string') {
      listenerApi.dispatch(appActions.setToken(token));
    }

    listenerApi.dispatch(appActions.endLoadApp());
  },
});
