import React from 'react';

import Animated from 'react-native-reanimated';

export interface CollapsibleProps {
  /**
   * Custom master content
   */
  renderMasterView?: (
    progress: Animated.SharedValue<number>,
  ) => React.ReactNode;

  /**
   * use function-> React.Node instead children
   */
  renderContent?: (progress: Animated.SharedValue<number>) => React.ReactNode;

  children?: React.ReactNode;
}
