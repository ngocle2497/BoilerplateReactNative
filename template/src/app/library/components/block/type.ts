import React from 'react';
import { FlexAlignType, StyleProp, ViewProps, ViewStyle } from 'react-native';

import { Colors } from '@theme';

type Direction = 'row' | 'column' | 'column-reverse' | 'row-reverse';

type JustifyContent =
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

type Position = 'absolute' | 'relative';

type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

type OverFlow = 'visible' | 'hidden' | 'scroll';

export type ShadowConfig = {
  shadowColor?: string;
  shadowOffset?: {
    width?: number;
    height?: number;
  };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};
export interface BlockProps extends ViewProps {
  flexWrap?: FlexWrap;

  left?: number | string;

  right?: number | string;

  bottom?: number | string;

  top?: number | string;

  zIndex?: number;

  overflow?: OverFlow;

  borderBottomWidth?: number;

  borderLeftWidth?: number;

  borderRightWidth?: number;

  borderTopWidth?: number;

  borderBottomColor?: string;

  borderBottomLeftRadius?: number;

  borderBottomRightRadius?: number;

  borderLeftColor?: string;

  borderRightColor?: string;

  borderStyle?: 'solid' | 'dotted' | 'dashed';

  borderTopColor?: string;

  borderTopLeftRadius?: number;

  borderTopRightRadius?: number;

  opacity?: number;

  /**
   * Config position
   * @default undefined
   */
  position?: Position;

  /**
   * Enable to using {flex:1}
   * @default undefined
   */
  block?: boolean;

  /**
   * Using margin
   * @default undefined
   */
  margin?: number;

  /**
   * overwrite flex box
   */
  flex?: number;

  /**
   * Using align items
   * @default undefined
   */
  alignItems?: FlexAlignType;

  /**
   * Using align self
   * @default undefined
   */
  alignSelf?: 'auto' | FlexAlignType;

  /**
   * Using margin left
   * @default undefined
   */
  marginLeft?: number;

  /**
   * Using margin right
   * @default undefined
   */
  marginRight?: number;

  /**
   * Using margin bottom
   * @default undefined
   */
  marginBottom?: number;

  /**
   * Using margin top
   * @default undefined
   */
  marginTop?: number;

  /**
   * Using flex direction
   * @default undefined
   */
  direction?: Direction;

  /**
   * Using padding
   * @default undefined
   */
  padding?: number;

  /**
   * Using padding top
   * @default undefined
   */
  paddingTop?: number;

  /**
   * Using padding bottom
   * @default undefined
   */
  paddingBottom?: number;

  /**
   * Using padding left
   * @default undefined
   */
  paddingLeft?: number;

  /**
   * Using padding right
   * @default undefined
   */
  paddingRight?: number;

  /**
   * Using padding horizontal
   * @default undefined
   */
  paddingHorizontal?: number;

  /**
   * Using padding vertical
   * @default undefined
   */
  paddingVertical?: number;

  /**
   * Actual width
   * @default undefined
   */
  width?: number | string;

  /**
   * Actual max width
   * @default undefined
   */
  maxWidth?: number | string;

  /**
   * Actual min width
   * @default undefined
   */
  minWidth?: number | string;

  /**
   * Actual height
   * @default undefined
   */
  height?: number | string;

  /**
   * Actual max width
   * @default undefined
   */
  maxHeight?: number | string;

  /**
   * Actual min width
   * @default undefined
   */
  minHeight?: number | string;

  /**
   * Using border
   * @default undefined
   */
  border?: boolean;

  /**
   * Set width for border
   * @default undefined
   */
  borderWidth?: number;

  /**
   * Set color for border
   * @default undefined
   */
  borderColor?: string;

  /**
   * Using background color
   * @default undefined
   */
  color?: string;

  /**
   * Overwrite background color with theme
   */
  colorTheme?: keyof Colors;

  /**
   * Using justify content
   * @default undefined
   */
  justifyContent?: JustifyContent;

  /**
   * Set true for using alignItems = 'center'
   * @default undefined
   */
  middle?: boolean;

  /**
   * Using border radius
   * @default undefined
   */
  borderRadius?: number;

  /**
   * Using shadow
   * @default undefined
   */
  shadow?: boolean;

  /**
   * Overwrite shadow
   */
  shadowConfig?: ShadowConfig;

  /**
   * Overwrite style for Block
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Children for Block
   * @default undefined
   */
  children?: React.ReactNode;
}
