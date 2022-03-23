import ArrowDown from './source/arrow-down.svg';
import ArrowUp from './source/arrow-up.svg';
import HorizontalDots from './source/horizontal-dots.svg';
import Loupe from './source/loupe.svg';
import Plush from './source/plus.svg';

export const SvgComponent = {
  loupe: Loupe,
  plus: Plush,
  arrowUp: ArrowDown,
  arrowDown: ArrowUp,
  horizontalDots: HorizontalDots,
};
export type SvgIconTypes = keyof typeof SvgComponent;
