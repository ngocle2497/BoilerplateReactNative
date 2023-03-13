import React from 'react';
import {
  StyleProp,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from 'react-native';

export interface TouchableScaleProps extends TouchableWithoutFeedbackProps {
  /**
   * Children of Touchable
   */
  children: React.ReactNode;

  /**
   * Min scale when touch
   * @default 0.9
   */
  minScale?: number;

  /**
   * Custom container style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;
}
