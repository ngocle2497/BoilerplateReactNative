import { ViewStyle, StyleProp } from 'react-native';
export interface SizeBoxProps {
    
    /**
     * Width of size box
     * @default 0
     */
    width?: number;

    /**
     * Height of size box
     * @default 0
     */
    height?: number;

    /**
     * Color of size box
     * @default transparent
     */
    backgroundColor?: string;

    /**
     * Children of size box
     * @default undefined
     */
    children?: React.ReactNode;

    /**
     * Overwrite style of size box
     * @default undefined
     */
    style?: StyleProp<ViewStyle>;
}