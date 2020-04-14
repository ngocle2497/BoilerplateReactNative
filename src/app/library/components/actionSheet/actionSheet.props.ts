import { TextStyle, ViewStyle } from 'react-native'
export interface OptionData {
    text: string;
    itemCallback?: any;
}

export interface ActionSheetProps {
    option?: OptionData[];

    title?: React.ReactNode | string;

    onPressOption?: (item: OptionData, index: number) => void;

    onPressCancel?: Function;

    textCancel?: string;

    onBackDropPress?: Function;

    closeOnBackDrop?: boolean;

    textOptionStyle?: TextStyle | TextStyle[];

    textCancelStyle?: TextStyle | TextStyle[];

    wrapOptionStyle?: ViewStyle | ViewStyle[];

    wrapCancelStyle?: ViewStyle | ViewStyle[];

    rootStyle?: ViewStyle | ViewStyle[];

    backDropColor?:string;
}