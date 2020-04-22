import { ViewStyle } from 'react-native';
export interface SizeBoxProps {
    width?: number;

    height?: number;

    backgroundColor?: string;

    children?: React.ReactNode;

    style?: ViewStyle | ViewStyle[];
}