import { StyleProp, ViewStyle, ImageStyle } from "react-native";

export interface Dimensions {
    width: number;
    height: number;
}

export interface Data {
    uri: string;
    data?: any;
}
export interface DataPress {
    data: any;
    uri: string;
    actualSize: Dimensions;
    column: number;
    width: number;
    height: number;
}
interface BaseProps {
    onPress?: (data: DataPress) => void;
    customImageComponent?: Function;
    customImageProps?: any;
    renderHeader?: (data: DataPress) => React.ReactNode;
    renderFooter?: (data: DataPress) => React.ReactNode;
    space?: number;
    containerImageStyle?: StyleProp<ImageStyle>;
}
export interface MasonryProps extends BaseProps {
    data?: Data[];
    columns?: number;
    onEndReach?: () => void;
    canRefresh?: boolean;
    onRefresh?: () => void;
    refreshing?: boolean;
    refreshColor?: string[];
    customRenderItem?: (data: DataPress) => React.ReactElement;
}
export interface ColumnsProps extends BaseProps {
    data: Array<ItemColumn>;
    dimensions: Dimensions;
    columns: number;
    customRenderItem?: (data: DataPress) => React.ReactElement;
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
    injectant?: Function;
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