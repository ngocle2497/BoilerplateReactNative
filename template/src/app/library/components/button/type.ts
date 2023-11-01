import React from 'react';
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

import { Colors } from '@theme';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Overwrite background color with theme for text
   */

  /**
   * Using color for button background color
   * @default undefined
   */
  buttonColor?: string;

  /**
   * Overwrite button background with theme
   * @default undefined
   */
  buttonColorTheme?: Colors;

  /**
   * Children for button
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * Disable button when press
   */
  throttleMs?: number;
}
