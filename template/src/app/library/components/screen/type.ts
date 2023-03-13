import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Edge } from 'react-native-safe-area-context';

export type ScreenProps = {
  /**
   * Children of Screen
   */
  children?: React.ReactNode;

  /**
   * Overwrite style of screen
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Color of Screen
   * @default transparent
   */
  backgroundColor?: string;

  /**
   * Status bar style
   * @default dark-content
   */
  statusBarStyle?: 'light-content' | 'dark-content';

  /**
   * Using safe area on ios
   * @default false
   */
  unsafe?: boolean;

  /**
   * Visibility status bar
   * @default true
   */
  hiddenStatusBar?: boolean;

  /**
   * Color of status bar for both Android/IOS
   */
  statusColor?: string;

  /**
   * Color of inset bottom
   * @default #ffffff
   */
  bottomInsetColor?: string;

  /**
   * Color of inset left
   * @default #ffffff
   */
  leftInsetColor?: string;

  /**
   * Color of inset left
   * @default #ffffff
   */
  rightInsetColor?: string;

  /**
   * Using scroll content
   * @default false
   */
  scroll?: boolean;

  /**
   * Inset for safe area view
   * @default undefined
   */
  excludeEdges?: 'all' | Edge[];

  /**
   * Animated onScroll
   * @default undefined
   */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export type InsetComponentProps = Pick<
  ScreenProps,
  | 'statusColor'
  | 'unsafe'
  | 'hiddenStatusBar'
  | 'bottomInsetColor'
  | 'leftInsetColor'
  | 'rightInsetColor'
  | 'statusBarStyle'
> & {
  edges: Edge[];
};

export interface InsetProps {
  color?: string;
  height: number;
  width: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export type ScreenComponentProps = CustomOmit<
  ScreenProps,
  'unsafe' | 'scroll' | 'excludeEdges'
> & {
  edges: Edge[];
  actualUnsafe: boolean;
};
