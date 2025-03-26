/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSignal, withLoadingFunc } from '@common/signal';
import { ApiConstants } from '@networking/api';
import { validResponse } from '@networking/helper';
import { NetWorkService } from '@networking/service';

const signalObj = createSignal(['login'] as const);

const login = async (body: any) => {
  await withLoadingFunc(async () => {
    const response = await NetWorkService.Post({
      body,
      signal: signalObj.login.signal,
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
  });
};

export const authenticationService = {
  login,
};
