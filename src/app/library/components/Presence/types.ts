export interface AnimatePresenceProps {
  /**
   * Fires when all exiting nodes have completed animating out.
   *
   * @public
   */
  onExitComplete?: () => void;

  exitBeforeEnter?: boolean;
}
