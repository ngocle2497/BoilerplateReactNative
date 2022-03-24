import React, { memo, useReducer } from 'react';

import type { PortalProviderProps } from './types';

import { PortalDispatchContext, PortalStateContext } from '../../context';
import { INITIAL_STATE, reducer } from '../../state';
import { PortalHost } from '../portal-host';

const PortalProviderComponent = ({ children }: PortalProviderProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <PortalDispatchContext.Provider value={dispatch}>
      <PortalStateContext.Provider value={state}>
        {children}
        <PortalHost name="root" />
      </PortalStateContext.Provider>
    </PortalDispatchContext.Provider>
  );
};

export const PortalProvider = memo(PortalProviderComponent);
PortalProvider.displayName = 'PortalProvider';
