import React from 'react';
import {
  ColorValue,
  FlexAlignType,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { NullableStyleProps } from '@common';
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
  shadowColor?: ColorValue | undefined;
  shadowOffset?: { width: number; height: number } | undefined;
  shadowOpacity?: number | undefined;
  shadowRadius?: number | undefined;
};

type StyleStringOrNumber = string | number;
export interface BlockProps extends ViewProps {
  flexWrap?: NullableStyleProps<FlexWrap>;

  left?: NullableStyleProps<StyleStringOrNumber>;

  right?: NullableStyleProps<StyleStringOrNumber>;

  bottom?: NullableStyleProps<StyleStringOrNumber>;

  top?: NullableStyleProps<StyleStringOrNumber>;

  zIndex?: NullableStyleProps<number>;

  overflow?: OverFlow;

  borderBottomWidth?: NullableStyleProps<number>;

  borderLeftWidth?: NullableStyleProps<number>;

  borderRightWidth?: NullableStyleProps<number>;

  borderTopWidth?: NullableStyleProps<number>;

  borderBottomColor?: NullableStyleProps<string>;

  borderBottomLeftRadius?: NullableStyleProps<number>;

  borderBottomRightRadius?: NullableStyleProps<number>;

  borderLeftColor?: NullableStyleProps<string>;

  borderRightColor?: NullableStyleProps<string>;

  borderStyle?: 'solid' | 'dotted' | 'dashed';

  borderTopColor?: NullableStyleProps<string>;

  borderTopLeftRadius?: NullableStyleProps<number>;

  borderTopRightRadius?: NullableStyleProps<number>;

  opacity?: NullableStyleProps<number>;

  /**
   * Config position
   * @default undefined
   */
  position?: NullableStyleProps<Position>;

  /**
   * Enable to using {flex:1}
   * @default undefined
   */
  block?: boolean;

  /**
   * Using margin
   * @default undefined
   */
  margin?: NullableStyleProps<number>;

  /**
   * overwrite flex box
   */
  flex?: NullableStyleProps<number>;

  /**
   * Using align items
   * @default undefined
   */
  alignItems?: NullableStyleProps<FlexAlignType>;

  /**
   * Using align self
   * @default undefined
   */
  alignSelf?: NullableStyleProps<'auto' | FlexAlignType>;

  /**
   * Using margin left
   * @default undefined
   */
  marginLeft?: NullableStyleProps<number>;

  /**
   * Using margin right
   * @default undefined
   */
  marginRight?: NullableStyleProps<number>;

  /**
   * Using margin bottom
   * @default undefined
   */
  marginBottom?: NullableStyleProps<number>;

  /**
   * Using margin top
   * @default undefined
   */
  marginTop?: NullableStyleProps<number>;

  /**
   * Using flex direction
   * @default undefined
   */
  direction?: NullableStyleProps<Direction>;

  /**
   * Using padding
   * @default undefined
   */
  padding?: NullableStyleProps<number>;

  /**
   * Using padding top
   * @default undefined
   */
  paddingTop?: NullableStyleProps<number>;

  /**
   * Using padding bottom
   * @default undefined
   */
  paddingBottom?: NullableStyleProps<number>;

  /**
   * Using padding left
   * @default undefined
   */
  paddingLeft?: NullableStyleProps<number>;

  /**
   * Using padding right
   * @default undefined
   */
  paddingRight?: NullableStyleProps<number>;

  /**
   * Using padding horizontal
   * @default undefined
   */
  paddingHorizontal?: NullableStyleProps<number>;

  /**
   * Using padding vertical
   * @default undefined
   */
  paddingVertical?: NullableStyleProps<number>;

  /**
   * Actual width
   * @default undefined
   */
  width?: NullableStyleProps<StyleStringOrNumber>;

  /**
   * Actual max width
   * @default undefined
   */
  maxWidth?: NullableStyleProps<StyleStringOrNumber>;

  /**
   * Actual min width
   * @default undefined
   */
  minWidth?: NullableStyleProps<StyleStringOrNumber>;

  /**
   * Actual height
   * @default undefined
   */
  height?: NullableStyleProps<StyleStringOrNumber>;

  /**
   * Actual max width
   * @default undefined
   */
  maxHeight?: NullableStyleProps<StyleStringOrNumber>;

  /**
   * Actual min width
   * @default undefined
   */
  minHeight?: NullableStyleProps<StyleStringOrNumber>;

  /**
   * Using border
   * @default undefined
   */
  border?: boolean;

  /**
   * Set width for border
   * @default undefined
   */
  borderWidth?: NullableStyleProps<number>;

  /**
   * Set color for border
   * @default undefined
   */
  borderColor?: NullableStyleProps<string>;

  /**
   * Using background color
   * @default undefined
   */
  color?: NullableStyleProps<string>;

  /**
   * Overwrite background color with theme
   */
  colorTheme?: keyof Colors;

  /**
   * Overwrite border color with theme
   */
  borderColorTheme?: keyof Colors;

  /**
   * Using justify content
   * @default undefined
   */
  justifyContent?: NullableStyleProps<JustifyContent>;

  /**
   * Set true for using alignItems = 'center'
   * @default undefined
   */
  middle?: boolean;

  /**
   * Using border radius
   * @default undefined
   */
  borderRadius?: NullableStyleProps<number>;

  /**
   * Using shadow
   * @default undefined
   */
  shadow?: boolean;

  /**
   * Overwrite shadow
   */
  shadowConfig?: NullableStyleProps<ShadowConfig>;

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
