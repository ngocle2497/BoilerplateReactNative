import React, { createRef, forwardRef, memo, useImperativeHandle } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectRoot } from '@redux-selector/app';
import { RootState } from '@store/all-reducers';

const RXStoreComponent = forwardRef((_, ref) => {
  // state
  const dispatchRx = useDispatch();

  const storeValue = useSelector(selectRoot);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        dispatchRx(action);
      },
      getState: (state: keyof RootState) => {
        return storeValue[state];
      },
    }),
    [dispatchRx, storeValue],
  );

  return null;
});

type RXStoreType = {
  dispatch: (action: ActionBase) => void;
  getState: <K extends keyof RootState>(selector: K) => RootState[K];
};

const storeRef = createRef<RXStoreType>();

export const RXStore = memo(
  () => <RXStoreComponent ref={storeRef} />,
  () => true,
);

export function dispatch<T = undefined>(action: ActionBase<T>) {
  if (storeRef.current) {
    storeRef.current.dispatch(action);
  }
}

export function getState<K extends keyof RootState>(selector: K): RootState[K] {
  if (storeRef.current) {
    return storeRef.current.getState(selector);
  }

  return {} as RootState[K];
}
