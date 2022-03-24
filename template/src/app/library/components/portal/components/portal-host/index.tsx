import React, { memo, useEffect } from 'react';

import type { PortalHostProps } from './types';

import { usePortal, usePortalState } from '../../hooks';

const PortalHostComponent = ({ name }: PortalHostProps) => {
  // state
  const state = usePortalState(name);
  const { registerHost, deregisterHost } = usePortal(name);

  // effect
  useEffect(() => {
    registerHost();
    return () => {
      deregisterHost();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  return <>{state.map(item => item.node)}</>;
};

export const PortalHost = memo(PortalHostComponent);
PortalHost.displayName = 'PortalHost';
