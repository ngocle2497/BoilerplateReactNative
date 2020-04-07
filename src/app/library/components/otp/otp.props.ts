import { TextInputProps, ViewStyle, TextStyle } from "react-native";

export interface OtpProps extends TextInputProps {
    length: number;

    defaultOtp?: string;

    containerStyle?: ViewStyle | ViewStyle[];

    wrapInputStyle?: ViewStyle | ViewStyle[];

    wrapInputActiveStyle?: ViewStyle | ViewStyle[];

    textStyle?: TextStyle | TextStyle[];

    textEntry?: string;

    dependency?: any[];

    onOtpValid?: Function;

    onOtpInValid?: Function;
}