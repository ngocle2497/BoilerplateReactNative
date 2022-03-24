import { ReactElement } from 'react';
import { ViewStyle } from 'react-native';

import { TypeIn, TypeOut } from './untils';
export type Direction = 'up' | 'down' | 'left' | 'right';
export interface ModalProps {
  /**
   * Content of modal
   * @default undefined
   */
  children?: ReactElement;

  /**
   * Show/hide modal
   * @requires
   */
  isVisible: boolean;

  /**
   *  Can be 'up', 'down', 'left, or 'right', or a combination of them like ['up','down']
   * @default undefined
   */
  swipingDirection?: Direction | Direction[];

  /**
   * Move content when pan gesture move
   * @default false
   */
  moveContentWhenDrag?: boolean;

  /**
   * Custom back drop opacity
   * @default 0.3
   */
  backdropOpacity?: number;

  /**
   * Swiping threshold that when reached calls onSwipeComplete
   * @default 100
   */
  swipeThreshold?: number;

  /**
   * Custom backdrop color
   * @default black
   */
  backdropColor?: string;

  /**
   * Custom backdrop component
   */
  customBackDrop?: ReactElement;

  /**
   * Duration back drop when show
   * @default 300
   */
  backdropInDuration?: number;

  /**
   * Duration back drop when hide
   * @default 300
   */
  backdropOutDuration?: number;

  /**
   * Custom animated show duration
   * @default 300
   */
  animatedInDuration?: number;
  /**
   * Custom animated hide duration
   * @default 300
   */
  animatedOutDuration?: number;

  /**
   * Modal show animation
   * @default fadeIn
   */
  animatedIn?: TypeIn;

  /**
   * Modal hide animation
   * @default fadeOut
   */
  animatedOut?: TypeOut;

  /**
   * Overwrite modal style
   * @default undefined
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Show gesture component or not
   * @default true
   */
  hasGesture?: boolean;

  /**
   * Should show modal translucent status bar
   * @default true
   */
  statusBarTranslucent?: boolean;

  /**
   * Custom gesture component
   * @default undefined
   */
  customGesture?: () => ReactElement;

  /**
   * Called before the modal hide animation begins
   * @default undefined
   */
  onModalWillHide?: () => void;

  /**
   * Called when the modal is completely hidden
   * @default undefined
   */
  onModalHide?: () => void;

  /**
   * Called before the modal show animation begins
   * @default undefined
   */
  onModalWillShow?: () => void;

  /**
   * Called when the modal is completely visible
   * @default undefined
   */
  onModalShow?: () => void;

  /**
   * Called when the swipeThreshold has been reached
   * @default undefined
   */
  onSwipeComplete?: () => void;

  /**
   * Called when the backdrop is pressed
   * @default undefined
   */
  onBackdropPress?: () => void;

  /**
   * Called when the Android back button is pressed
   * @default undefined
   */
  onBackButtonPress?: () => void;
}
