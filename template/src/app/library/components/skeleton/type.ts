import { ReactElement } from 'react';

export interface SkeletonProps {
  overlayColor?: string;
  linearColor?: string[];
  children?: ReactElement | ReactElement[];
}
