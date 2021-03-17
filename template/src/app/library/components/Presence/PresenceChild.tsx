import * as React from 'react';
import {useMemo} from 'react';
import {useConst} from '@common';

import {PresenceContext} from './PresenceContext';

interface PresenceChildProps {
  children: React.ReactElement<any>;
  isPresent: boolean;
  onExitComplete?: () => void;
}

let presenceId = 0;
function getPresenceId() {
  const id = presenceId;
  presenceId++;
  return id;
}

export const PresenceChild = ({
  children,
  isPresent,
  onExitComplete,
}: PresenceChildProps) => {
  const presenceChildren = useConst(newChildrenMap);
  const id = useConst(getPresenceId);

  const context = useMemo(
    () => {
      return {
        id,
        isPresent,
        onExitComplete: (childId: number) => {
          presenceChildren.set(childId, true);
          let allComplete = true;
          presenceChildren.forEach(isComplete => {
            if (!isComplete) {
              allComplete = false;
            }
          });

          allComplete && onExitComplete?.();
        },
        register: (childId: number) => {
          presenceChildren.set(childId, false);
          return () => presenceChildren.delete(childId);
        },
      };
    },
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    [isPresent],
  );

  useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);

  return (
    <PresenceContext.Provider value={context}>
      {children}
    </PresenceContext.Provider>
  );
};

function newChildrenMap(): Map<number, boolean> {
  return new Map();
}
