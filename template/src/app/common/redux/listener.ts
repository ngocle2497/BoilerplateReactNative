/* eslint-disable @typescript-eslint/no-explicit-any */
import { createListenerMiddleware } from '@reduxjs/toolkit';

export const listenerMiddleware = createListenerMiddleware();
const startAppListening = listenerMiddleware.startListening;

type StartAppListening = typeof startAppListening;

export const takeLatestListeners =
  (_withLoading?: boolean): StartAppListening =>
  (startListeningOption: any) => {
    return startAppListening({
      ...startListeningOption,
      effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        await listenerApi.delay(15);

        await startListeningOption.effect(action, listenerApi);
      },
    });
  };

export const takeLeadingListeners =
  (_withLoading?: boolean): StartAppListening =>
  (startListeningOption: any) => {
    return startAppListening({
      ...startListeningOption,
      effect: async (action, listenerApi) => {
        listenerApi.unsubscribe();

        await startListeningOption.effect(action, listenerApi);

        listenerApi.subscribe();
      },
    });
  };

export const debounceListeners =
  (msDuration: number, _withLoading?: boolean): StartAppListening =>
  (startListeningOption: any) => {
    return startAppListening({
      ...startListeningOption,
      effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        await listenerApi.delay(msDuration);

        await startListeningOption.effect(action, listenerApi);
      },
    });
  };

export const throttleListeners =
  (msDuration: number, _withLoading?: boolean): StartAppListening =>
  (startListeningOption: any) => {
    return startAppListening({
      ...startListeningOption,
      effect: async (action, listenerApi) => {
        listenerApi.unsubscribe();

        await startListeningOption.effect(action, listenerApi);

        await listenerApi.delay(msDuration);

        listenerApi.subscribe();
      },
    });
  };
