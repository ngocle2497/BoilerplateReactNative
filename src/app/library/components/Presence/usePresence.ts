import {useContext, useEffect} from 'react';
import {useConst} from '@common';

import {PresenceContext, PresenceContextProps} from './PresenceContext';

export type SafeToRemove = () => void;

type AlwaysPresent = [true, null];

type Present = [true];

type NotPresent = [false, SafeToRemove];

export function usePresence(): AlwaysPresent | Present | NotPresent {
  const context = useContext(PresenceContext);

  if (context === null) {
    return [true, null];
  }

  const {isPresent, onExitComplete, register} = context;

  const id = useUniqueId();
  useEffect(() => register(id), []);

  const safeToRemove = () => onExitComplete?.(id);

  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
export function useIsPresent() {
  return isPresent(useContext(PresenceContext));
}

export function isPresent(context: PresenceContextProps | null) {
  return context === null ? true : context.isPresent;
}

let counter = 0;
const incrementId = () => counter++;
const useUniqueId = () => useConst(incrementId);
