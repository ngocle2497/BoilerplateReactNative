import React from 'react';
import { ScrollViewProps } from 'react-native';

export interface StackViewProps extends ScrollViewProps {
  children?: React.ReactNode;
}
