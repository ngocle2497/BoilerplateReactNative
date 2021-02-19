import React from 'react';
import Animated from 'react-native-reanimated';
export interface CollapsibleProps {
  renderMasterView?: (
    progress: Animated.SharedValue<number>,
  ) => React.ReactNode;

  renderContent?: (progress: Animated.SharedValue<number>) => React.ReactNode;
  children?: React.ReactNode;
}
