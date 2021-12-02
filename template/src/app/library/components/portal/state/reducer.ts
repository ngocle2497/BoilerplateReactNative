/* eslint-disable @typescript-eslint/no-explicit-any */
import {PortalType} from '../types';

import {ACTIONS} from './constants';
import {ActionTypes, AddPortalAction} from './types';

const registerHost = (
  state: Record<string, Array<PortalType>>,
  hostName: string,
) => {
  if (!(hostName in state)) {
    state[hostName] = [];
  }
  return state;
};

const deregisterHost = (
  state: Record<string, Array<PortalType>>,
  hostName: string,
) => {
  delete state[hostName];
  return state;
};

const addOrUpdatePortal = (
  state: Record<string, Array<PortalType>>,
  hostName: string,
  portalName: string,
  node: any,
) => {
  if (!(hostName in state)) {
    state = registerHost(state, hostName);
  }

  /**
   * updated portal, if it was already added.
   */
  const index = state[hostName].findIndex(item => item.name === portalName);
  if (index !== -1) {
    state[hostName][index].node = node;
  } else {
    state[hostName].push({
      name: portalName,
      node,
    });
  }
  return state;
};

const removePortal = (
  state: Record<string, Array<PortalType>>,
  hostName: string,
  portalName: string,
) => {
  if (!(hostName in state)) {
    return state;
  }

  const newHostName = state[hostName].filter(item => item.name !== portalName);
  return {...state, hostName: newHostName};
};

export const reducer = (
  state: Record<string, Array<PortalType>>,
  action: ActionTypes,
) => {
  const clonedState = {...state};
  switch (action.type) {
    case ACTIONS.REGISTER_HOST:
      return registerHost(clonedState, action.hostName);
    case ACTIONS.UN_REGISTER_HOST:
      return deregisterHost(clonedState, action.hostName);
    case ACTIONS.ADD_PORTAL:
    case ACTIONS.UPDATE_PORTAL:
      return addOrUpdatePortal(
        clonedState,
        action.hostName,
        (action as AddPortalAction).portalName,
        (action as AddPortalAction).node,
      );
    case ACTIONS.REMOVE_PORTAL:
      return removePortal(
        clonedState,
        action.hostName,
        (action as AddPortalAction).portalName,
      );
    default:
      return state;
  }
};
