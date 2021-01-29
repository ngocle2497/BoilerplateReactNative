/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
export interface LightBoxProps {
  /**
   * Children of light box
   */
  children: any;

  /**
   * Header when light open
   */
  renderHeader?: (onClose?: Function) => React.ReactNode;

  /**
   * Background color when light box open
   * @default black
   */
  backgroundColor?: string;

  /**
   * Enable swipe to dismiss
   * @default true
   */
  swipeToDismiss?: boolean;

  /**
   * Over write content
   * @default undefined
   */
  renderContent?: () => React.ReactNode;
}
export interface ChildrenTransitionProps {
  /**
   * Reference of root view
   */
  viewRef: any;

  /**
   * Origin of children
   */
  origin: any;

  /**
   * Custom header instead icon close
   * @default undefined
   */
  renderHeader?: () => React.ReactNode;
  /**
   * Enable swipe
   * @default true
   */
  swipeToDismiss: boolean;

  /**
   * Backdrop color
   */
  backgroundColor: string;

  /**
   * Children copy from children LightBox
   */

  children: any;

  /**
   * Custom header instead icon close
   */
  onClose: () => void;
}
