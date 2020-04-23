import { ViewStyle, ViewProps } from 'react-native';

type Direction = 'row' | 'column' | 'column-reverse' | 'row-reverse'
type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly'

export interface BlockProps extends ViewProps {

    block?: boolean;

    margin?: number;

    marginLeft?: number;

    marginRight?: number;

    marginBottom?: number;

    marginTop?: number;

    direction?: Direction;

    padding?: number;

    paddingHorizontal?: number;

    paddingVertical?: number;

    width?: number;

    height?: number;

    border?: boolean;

    borderWidth?: number;

    borderColor?: string;

    color?: string;

    justifyContent?: JustifyContent;

    middle?: boolean;

    borderRadius?: number;

    shadow?: boolean;

    style?: ViewStyle | ViewStyle[];

    children?: React.ReactNode;
}