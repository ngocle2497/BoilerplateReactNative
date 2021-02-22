import React from 'react';
import {IconTypes} from '@assets/icon';
import {ViewStyle} from 'react-native';
export interface FABDefaultProps {
  onPress?: () => void;

  style?: ViewStyle | ViewStyle[];

  icon?: IconTypes;

  label?: string | React.ReactNode;
}
