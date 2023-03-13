/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { onCheckType } from '../method/index';

export type Listener<T = undefined> = (action: ActionBase<T>) => void;
type ActionListenerContainer<T = undefined> = {
  action: string;
  listener: Listener<T>;
};
const subscribedBefore: Array<Listener<any>> = [];

const subscribedAfter: Array<Listener<any>> = [];

const actionsSubscribedBefore: Array<ActionListenerContainer<any>> = [];

const actionsSubscribedAfter: Array<ActionListenerContainer<any>> = [];

const subscribe = <T = undefined>(
  listener: Listener<T>,
  listenerContainer: Array<Listener<T>>,
) => {
  if (!onCheckType(listener, 'function')) {
    throw new Error('Expected the listener to be a function.');
  }

  listenerContainer.push(listener);

  return () => {
    const index = listenerContainer.indexOf(listener);

    listenerContainer.splice(index, 1);
  };
};

export const subscribeBefore = <T = undefined>(listener: Listener<T>) => {
  return subscribe(listener, subscribedBefore);
};

export const subscribeAfter = <T = undefined>(listener: Listener<T>) => {
  return subscribe(listener, subscribedAfter);
};

const subscribeAction = <T = undefined>(
  actionListenerContainer: ActionListenerContainer<T>,
  listenerContainer: ActionListenerContainer<T>[],
) => {
  if (!onCheckType(actionListenerContainer.action, 'string')) {
    throw new Error('Expected the action to be a string.');
  }

  if (!onCheckType(actionListenerContainer.listener, 'function')) {
    throw new Error('Expected the listener to be a function.');
  }

  listenerContainer.push(actionListenerContainer);

  return () => {
    const index = listenerContainer.indexOf(actionListenerContainer);

    listenerContainer.splice(index, 1);
  };
};

export const subscribeActionBefore = <T = undefined>(
  action: string,
  listener: Listener<T>,
) => {
  const actionListenerContainer = { action, listener };

  return subscribeAction(actionListenerContainer, actionsSubscribedBefore);
};

export const subscribeActionAfter = <T = undefined>(
  action: string,
  listener: Listener<T>,
) => {
  const actionListenerContainer = { action, listener };

  return subscribeAction(actionListenerContainer, actionsSubscribedAfter);
};

export const unsubscribeBefore = () => {
  subscribedBefore.length = 0;
};

export const unsubscribeActionsBefore = () => {
  actionsSubscribedBefore.length = 0;
};

export const unsubscribeAfter = () => {
  subscribedAfter.length = 0;
};

export const unsubscribeActionsAfter = () => {
  actionsSubscribedAfter.length = 0;
};

export const unsubscribeAll = () => {
  unsubscribeBefore();

  unsubscribeActionsBefore();

  unsubscribeAfter();

  unsubscribeActionsAfter();
};

const _unsubscribeAction = (
  listenerContainer: ActionListenerContainer[],
  filterAction: string,
) => {
  const filteredListenerContainer = listenerContainer.filter(
    ({ action }) => action !== filterAction,
  );

  listenerContainer.length = 0;

  listenerContainer.push(...filteredListenerContainer);
};

export const unsubscribeActionBefore = (action: string) => {
  _unsubscribeAction(actionsSubscribedBefore, action);
};

export const unsubscribeActionAfter = (action: string) => {
  _unsubscribeAction(actionsSubscribedAfter, action);
};

export const unsubscribeActionAll = (action: string) => {
  unsubscribeActionBefore(action);

  unsubscribeActionAfter(action);
};

const _callListeners = (action: ActionBase, listenerContainer: Listener[]) => {
  for (let i = listenerContainer.length - 1; i >= 0; i--) {
    const listener = listenerContainer[i];

    if (typeof action === 'object') {
      listener(action);
    }
  }
};

const _callActionListeners = (
  action: ActionBase,
  listenerContainer: ActionListenerContainer[],
) => {
  for (let i = listenerContainer.length - 1; i >= 0; i--) {
    const listener = listenerContainer[i];

    if (
      action &&
      onCheckType(action.type, 'string') &&
      listener.action === action.type
    ) {
      listener.listener(action);
    }
  }
};

export const subscribeActionMiddleware: Middleware =
  (_storeApi: MiddlewareAPI) =>
  (next: Dispatch) =>
  <A extends ActionBase>(action: A) => {
    _callListeners(action, subscribedBefore);

    _callActionListeners(action, actionsSubscribedBefore);

    const result = next(action);

    _callListeners(action, subscribedAfter);

    _callActionListeners(action, actionsSubscribedAfter);

    return result;
  };
/**
 * Usage
 *
 * useEffect(() => {
 *   const unsubscribe = subscribeAfter(action =>
 *     console.log(`Before state change action ${action.type}`),
 *   );
 *   return () => {
 *     unsubscribe();
 *   };
 * }, []);
 *
 * useEffect(() => {
 *   const unsubscribe = subscribeActionBefore('MY_ACTION_TYPE', action =>
 *     console.log(`Before state change action MY_ACTION_TYPE`),
 *   );
 *   return () => {
 *     unsubscribe();
 *   };
 * }, []);
 *
 * useEffect(() => {
 *   const unsubscribe = subscribeActionAfter('MY_ACTION_TYPE', action =>
 *     console.log(`After state change action MY_ACTION_TYPE`),
 *   );
 *   return () => {
 *     unsubscribe();
 *   };
 * }, []);
 */
