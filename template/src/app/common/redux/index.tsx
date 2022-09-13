/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, forwardRef, useImperativeHandle } from 'react';

import isEqual from 'react-fast-compare';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/all-reducers';
import { createSelectorCreator, defaultMemoize } from 'reselect';

type ActionBase<T = any> = {
  type: string;
  payload?: T;
};

const RXStoreComponent = forwardRef((_, ref) => {
  // state
  const dispatchRx = useDispatch();
  const store = useSelector((x: RootState) => x);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        dispatchRx(action);
      },
      getState: (state: keyof RootState) => {
        return store[state];
      },
    }),
    [dispatchRx, store],
  );
  return null;
});

type RXStoreType = {
  dispatch: (action: ActionBase) => void;
  getState: <K extends keyof RootState>(selector: K) => RootState[K];
};

const storeRef = createRef<RXStoreType>();

export const RXStore = () => <RXStoreComponent ref={storeRef} />;

export const dispatch = (action: ActionBase) => {
  if (storeRef.current) {
    storeRef.current.dispatch(action);
  }
};
export function getState<K extends keyof RootState>(selector: K): RootState[K] {
  if (storeRef.current) {
    return storeRef.current.getState(selector);
  }
  return {} as RootState[K];
}
export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
);
