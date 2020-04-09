import { TouchableWithoutFeedbackProps } from "react-native";
import Animated from "react-native-reanimated";


export interface RippleProps extends TouchableWithoutFeedbackProps {
    children: React.ReactNode;

    onPress?: any;

    onLayout?: any;

    rippleColor?: string;

    rippleOpacity?: number;

    rippleFade?: boolean;

    rippleDuration?: number;

    rippleCentered?: boolean;

    rippleSize?: number;
    
    onRippleAnimation?: (progress: Animated.Value<number>, callBack: any) => void;
}