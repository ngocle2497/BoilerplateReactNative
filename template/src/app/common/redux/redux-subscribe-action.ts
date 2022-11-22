import { ActionBase } from '@config/type';
import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { onCheckType } from '../method/index';

export type Listener = (action: ActionBase) => void;
type ActionListenerContainer = {
  action: string;
  listener: Listener;
};
const _subscribedBefore: Listener[] = [];
const _subscribedAfter: Listener[] = [];
const _actionsSubscribedBefore: ActionListenerContainer[] = [];
const _actionsSubscribedAfter: ActionListenerContainer[] = [];

const _subscribe = (listener: Listener, listenerContainer: Listener[]) => {
  if (!onCheckType(listener, 'function')) {
    throw new Error('Expected the listener to be a function.');
  }
  listenerContainer.push(listener);
  return () => {
    const index = listenerContainer.indexOf(listener);
    listenerContainer.splice(index, 1);
  };
};
export const subscribeBefore = (listener: Listener) => {
  return _subscribe(listener, _subscribedBefore);
};

export const subscribeAfter = (listener: Listener) => {
  return _subscribe(listener, _subscribedAfter);
};
const _subscribeAction = (
  actionListenerContainer: ActionListenerContainer,
  listenerContainer: ActionListenerContainer[],
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

export const subscribeActionBefore = (action: string, listener: Listener) => {
  const actionListenerContainer = { action, listener };
  return _subscribeAction(actionListenerContainer, _actionsSubscribedBefore);
};

export const subscribeActionAfter = (action: string, listener: Listener) => {
  const actionListenerContainer = { action, listener };
  return _subscribeAction(actionListenerContainer, _actionsSubscribedAfter);
};

export const unsubscribeBefore = () => {
  _subscribedBefore.length = 0;
};

export const unsubscribeActionsBefore = () => {
  _actionsSubscribedBefore.length = 0;
};

export const unsubscribeAfter = () => {
  _subscribedAfter.length = 0;
};

export const unsubscribeActionsAfter = () => {
  _actionsSubscribedAfter.length = 0;
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
  _unsubscribeAction(_actionsSubscribedBefore, action);
};

export const unsubscribeActionAfter = (action: string) => {
  _unsubscribeAction(_actionsSubscribedAfter, action);
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
    _callListeners(action, _subscribedBefore);
    _callActionListeners(action, _actionsSubscribedBefore);
    const result = next(action);
    _callListeners(action, _subscribedAfter);
    _callActionListeners(action, _actionsSubscribedAfter);
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
