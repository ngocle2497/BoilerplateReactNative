import { validResponse } from '@common/method';
import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { authenticationActions } from '../action-slice/authentication';

export const runAuthenticationListener = () => {
  takeLatestListeners()({
    actionCreator: authenticationActions.login,
    effect: async (action, listenerApi) => {
      const { body } = action.payload;

      console.log({ body });

      await listenerApi.delay(1000);

      const response = await NetWorkService.Post({
        url: ApiConstants.LOGIN,
        body,
        signal: listenerApi.signal,
      });

      if (!response) {
        return;
      }

      if (validResponse(response)) {
        // TODO: do something when login success
      }
    },
  });
};
