import { FlatListProps, TextStyle, ViewStyle } from "react-native";


export interface DropdownOption {
    text: string;
    itemCallback?: any;
}


export interface DropdownProps extends FlatListProps<DropdownOption> {
    onPress?: (item: DropdownOption, index: number) => void;

    data: DropdownOption[];

    defaultSelect?: string;

    renderItem?: any;

    backDropColor?: string;

    textStyle?: TextStyle | TextStyle[];

    buttonStyle?: ViewStyle | ViewStyle[];

    rightChildren?: React.ReactNode;

    customItem?: (item: DropdownOption, index: number) => React.ReactNode;

    textItemStyle?: TextStyle | TextStyle[];

    useBottomInset?: boolean;
}
export interface DropItemProps {
    item: DropdownOption;

    index: number;

    onPress: (item: DropdownOption, index: number) => void;

    customItem?: (item: DropdownOption, index: number) => React.ReactNode;

    textItemStyle?: TextStyle | TextStyle[];
}