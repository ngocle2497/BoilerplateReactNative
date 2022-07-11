import { handleErrorResponse } from '@common'
import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { loginActions } from '../action-slice/login';

takeLatestListeners(true)({
  actionCreator: loginActions.onLogin,
  effect: async (action, listenerApi) => {
    const { body } = action.payload;
    console.log({ body });
    await listenerApi.delay(1000);
    const response = await NetWorkService.Post({
      url: ApiConstants.LOGIN,
      body,
    });
    if (!response) {
      return;
    }
    if (handleErrorResponse(response)) {
      // TODO: do something when login success
    }
  },
});
