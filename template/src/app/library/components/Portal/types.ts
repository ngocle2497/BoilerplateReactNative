import type {ReactNode} from 'react';

export interface PortalMethods {
  mount: (name: string, node: ReactNode) => void;
  update: (name: string, node: ReactNode) => void;
  unMount: (name: string) => void;
}

export interface PortalType {
  name: string;
  node: ReactNode;
}
