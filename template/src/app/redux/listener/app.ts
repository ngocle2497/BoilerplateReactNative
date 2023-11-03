import { MMKV_KEY } from '@common/constant';
import { takeLatestListeners } from '@listener';
import { loadString } from '@utils/storage';

import { appActions } from '../action-slice/app';

export const runAppListener = () => {
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
};
