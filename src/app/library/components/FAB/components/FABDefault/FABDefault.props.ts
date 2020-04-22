import { IconTypes } from './../../../../../assets/icon/index';
import { ViewStyle } from 'react-native';
export interface FABDefaultProps {
    onPress?: () => void;
    
    style?: ViewStyle | ViewStyle[];
    
    icon?:IconTypes;

    label?:string| React.ReactNode;
}