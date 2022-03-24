import { memo, useEffect, useMemo } from 'react';

import { randomUniqueId } from '@common';

import type { PortalProps } from './types';

import { usePortal } from '../../hooks';

const PortalComponent = ({
  name: _providedName,
  hostName,
  handleOnMount,
  handleOnUnMount,
  children,
}: PortalProps) => {
  // state
  const { addPortal, removePortal, updatePortal } = usePortal(hostName);
  const name = useMemo(
    () => _providedName || randomUniqueId(),
    [_providedName],
  );

  // effects
  useEffect(() => {
    if (handleOnMount) {
      handleOnMount(() => addPortal(name, children));
    } else {
      addPortal(name, children);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (handleOnUnMount) {
        handleOnUnMount(() => removePortal(name));
      } else {
        removePortal(name);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updatePortal(name, children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  // render
  return null;
};

export const Portal = memo(PortalComponent);
Portal.displayName = 'Portal';
