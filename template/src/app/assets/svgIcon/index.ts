import Loupe from './source/loupe.svg';
import Plush from './source/plus.svg';
import ArrowDown from './source/arrowDown.svg';
import ArrowUp from './source/arrowUp.svg';
import HorizontalDots from './source/horizontalDots.svg';

export const SvgComponent = {
  loupe: Loupe,
  plus: Plush,
  arrowUp: ArrowDown,
  arrowDown: ArrowUp,
  horizontalDots: HorizontalDots,
};
export type SvgIconTypes = keyof typeof SvgComponent;
