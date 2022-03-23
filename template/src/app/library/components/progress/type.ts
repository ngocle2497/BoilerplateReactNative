import { ProgressCircleProps } from './components/circle/type';
import { ProgressLinearProps } from './components/linear/type';

export type ProgressProps =
  | ({ type: 'linear' } & ProgressLinearProps)
  | ({ type: 'circle' } & ProgressCircleProps);
