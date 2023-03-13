import { validResponse } from '@common';
import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { authenticationActions } from '../action-slice/authentication';

takeLatestListeners(true)({
  actionCreator: authenticationActions.login,
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

    if (validResponse(response)) {
      // TODO: do something when login success
    }
  },
});
