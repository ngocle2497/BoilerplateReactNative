import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { appActions } from '../action-slice/app';
import { loginActions } from '../action-slice/login';

takeLatestListeners({
  actionCreator: loginActions.onLogin,
  effect: async (action, listenerApi) => {
    const { body } = action.payload;
    await listenerApi.delay(1000);
    console.log('12', body);
    listenerApi.dispatch(appActions.onStartProcess());
    const response = await NetWorkService.Post({
      url: ApiConstants.LOGIN,
      body,
    });

    listenerApi.dispatch(appActions.onEndProcess());
    if (!response) {
      return;
    }
  },
});
