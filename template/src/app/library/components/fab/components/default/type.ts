import React from 'react';
import { ViewStyle } from 'react-native';

import { IconTypes } from '@assets/icon';
export interface FABDefaultProps {
  onPress?: () => void;

  style?: ViewStyle | ViewStyle[];

  icon?: IconTypes;

  label?: string | React.ReactNode;
}
