/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext} from 'react';

export interface PresenceContextProps {
  id: number;
  isPresent: boolean;
  register: (id: number) => () => void;
  onExitComplete?: (id: number) => void;
}

export const PresenceContext = createContext<PresenceContextProps | null>(null);
