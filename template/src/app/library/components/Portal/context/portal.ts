import React, {createContext} from 'react';

import {ActionTypes} from '../state';
import {PortalType} from '../types';

export const PortalStateContext = createContext<Record<
  string,
  Array<PortalType>
> | null>(null);
export const PortalDispatchContext =
  createContext<React.Dispatch<ActionTypes> | null>(null);
