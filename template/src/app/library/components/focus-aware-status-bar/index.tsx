import * as React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

export const FocusAwareStatusBar = ({
  barStyle = 'dark-content',
  ...props
}: StatusBarProps) => {
  // state
  const isFocused = useIsFocused();

  // render
  return isFocused ? <StatusBar barStyle={barStyle} {...props} /> : null;
};
