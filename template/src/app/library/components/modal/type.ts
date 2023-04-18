import { ReactElement } from 'react';
import { ViewStyle } from 'react-native';

import { ComplexAnimationBuilder } from 'react-native-reanimated';

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
   * Custom back drop opacity
   * @default 0.3
   */
  backdropOpacity?: number;

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
   * Modal show animation
   * @default fadeIn
   */
  entering?: typeof ComplexAnimationBuilder | ComplexAnimationBuilder;
  /**
   * Modal hide animation
   * @default fadeOut
   */

  exiting?: typeof ComplexAnimationBuilder | ComplexAnimationBuilder;

  /**
   * Overwrite modal style
   * @default undefined
   */
  style?: ViewStyle | ViewStyle[];

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
