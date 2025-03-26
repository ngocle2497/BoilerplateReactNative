import { useAppStore } from '@stores/app';

/* eslint-disable @typescript-eslint/no-explicit-any */
class Signal {
  private abortController: AbortController;
  constructor() {
    this.abortController = new AbortController();
  }

  get signal(): AbortController['signal'] {
    this.abort();

    return this.abortController.signal;
  }

  abort = () => {
    this.abortController.abort();

    this.abortController = new AbortController();
  };
}

type ObjectFromList<T extends ReadonlyArray<string>, V = string> = {
  [K in T extends ReadonlyArray<infer U> ? U : never]: V;
};

export function createSignal<T extends ReadonlyArray<string>>(
  list: T,
): ObjectFromList<T, Signal> {
  const result = list.reduce((prev, curr) => {
    prev[curr] = new Signal();

    return prev;
  }, {} as Record<string, Signal>);

  return result as ObjectFromList<T, Signal>;
}

export async function withLoadingFunc(callback: () => any) {
  useAppStore.getState().setLoading(true);

  await callback();

  useAppStore.getState().setLoading(false);
}
