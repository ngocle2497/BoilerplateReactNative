/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';

export interface Dimensions {
  width: number;
  height: number;
}

export interface DataType {
  uri: string;
  data?: any;
}
export interface DataPassParam {
  data: any;
  uri: string;
  actualSize: Dimensions;
  column: number;
  width: number;
  height: number;
}
interface BaseProps {
  onPress?: (data: DataPassParam) => void;
  renderHeader?: (data: DataPassParam) => React.ReactElement;
  renderFooter?: (data: DataPassParam) => React.ReactElement;
  space?: number;
  containerImageStyle?: StyleProp<ImageStyle>;
}
export interface MasonryProps extends BaseProps {
  data?: DataType[];
  columns?: number;
  onEndReach?: () => void;
  canRefresh?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  refreshColor?: string[];
  customRenderItem?: (data: DataPassParam) => React.ReactElement;
}
export interface ColumnsProps extends BaseProps {
  data: Array<ItemColumn>;
  dimensions: Dimensions;
  columns: number;
  customRenderItem?: (data: DataPassParam) => React.ReactElement;
}
export interface CellProps extends BaseProps {
  uri: string;
  data?: any;
  column: number;
  dimensions: Dimensions;
  width: number;
  height: number;
}
export interface InjectorProps {
  children?: React.ReactChild;
  defaultComponent: React.ElementType;
  defaultProps?: any;
  injectant?: () => React.ReactElement;
  injectantProps?: any;
}
export interface ObjectColumn {
  uri: string;
  column: number;
}
export interface ObjectIndex {
  index: number;
  uri: string;
  column: number;
}
export interface ItemColumn {
  index: number;
  uri: string;
  column: number;
  dimensions: Dimensions;
}
