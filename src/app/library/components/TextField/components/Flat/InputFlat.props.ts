import { TextStyle } from "react-native";

export interface InputFlatProps {
    disabled?: boolean;

    error?: any;

    label?: string;

    labelTx?: string;

    onChange?: (value: string) => void;

    defaultValue?: string;

    activeTintLabelColor?: string;

    activeTintBorderColor?: string;

    unActiveTintLabelColor?: string;

    unActiveTintBorderColor?: string;

    backgroundLabelColor?: string;

    disabledBorderColor?: string;

    disabledLabelColor?: string;

    disabledInputColor?: string;

    errorBorderColor?: string;

    errorLabelColor?: string;

    inputStyle?: TextStyle | TextStyle[];

    placeholderTx?: string;

    placeholder?: string;

    placeholderColor?:string;
}