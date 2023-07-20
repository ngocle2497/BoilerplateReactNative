import React, {
  createRef,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
} from 'react';

import { useSharedValue } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

import { addListener } from '@reduxjs/toolkit';
import { RootState } from '@store/all-reducers';
import { store } from '@store/store';

const RXStoreComponent = forwardRef((_, ref) => {
  // state
  const dispatchRx = useDispatch();

  const storeValue = useSharedValue<RootState>(store.getState());

  // effect
  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        dispatchRx(action);
      },
      getState: (state: keyof RootState) => {
        return storeValue.value[state];
      },
    }),
    [dispatchRx],
  );

  useEffect(() => {
    const unsubscribe = store.dispatch(
      addListener({
        predicate: () => true,
        effect: (_, listenerApi) => {
          storeValue.value = listenerApi.getState() as RootState;
        },
      }),
    );

    return unsubscribe;
  }, []);

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
