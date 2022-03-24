import React from 'react';
import { ViewStyle } from 'react-native';

import { IconTypes } from '@assets/icon';

export interface Actions {
  icon: IconTypes;

  label?: string;

  onPress?: () => void;
}

export interface FABGroupProps {
  style?: ViewStyle | ViewStyle[];

  icon?: IconTypes;

  label?: string | React.ReactNode;

  actions?: Actions[];
}
