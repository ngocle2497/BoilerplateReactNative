import React from 'react';
import { ScrollViewProps } from 'react-native';

import { AnimatedProps } from 'react-native-reanimated';

export interface StackViewProps extends AnimatedProps<ScrollViewProps> {
  children?: React.ReactNode;
}
