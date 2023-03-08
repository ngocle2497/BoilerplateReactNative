import { ReactElement } from 'react';

export interface PostDelayProps {
  children: ReactElement | ReactElement[];
  durationMs?: number;
}
