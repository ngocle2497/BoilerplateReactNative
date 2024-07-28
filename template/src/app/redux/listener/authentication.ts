import { takeLatestListeners } from '@listener';
import { ApiConstants } from '@networking/api';
import { validResponse } from '@networking/helper';
import { NetWorkService } from '@networking/service';
import { authenticationActions } from '@redux-slice/authentication';

export const runAuthenticationListener = () => {
  takeLatestListeners()({
    actionCreator: authenticationActions.login,
    effect: async (action, listenerApi) => {
      const { body } = action.payload;

      console.log({ body });

      await listenerApi.delay(1000);

      const response = await NetWorkService.Post({
        body,
        signal: listenerApi.signal,
        url: ApiConstants.LOGIN,
      });

      if (!response) {
        return;
      }

      if (validResponse(response)) {
        /**
         * Do something when login success
         */
      }
    },
  });
};
