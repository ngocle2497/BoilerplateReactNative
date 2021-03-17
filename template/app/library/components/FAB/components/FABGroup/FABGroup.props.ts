import React from 'react';
import {IconTypes} from '@assets/icon';
import {ViewStyle} from 'react-native';

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
