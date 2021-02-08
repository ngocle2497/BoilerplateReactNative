/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext} from 'react';

import {VariantLabels} from './types';

export interface PresenceContextProps {
  id: number;
  isPresent: boolean;
  register: (id: number) => () => void;
  onExitComplete?: (id: number) => void;
  initial?: false | VariantLabels;
  custom?: any;
}

export const PresenceContext = createContext<PresenceContextProps | null>(null);
