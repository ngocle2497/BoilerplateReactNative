import { IconTypes } from './../../../assets/icon/index';
import { ViewStyle } from 'react-native';
export interface FABProps {
    type?: 'default' | 'group';

    style?: ViewStyle | ViewStyle[];
    
    icon?:IconTypes;

    label?:string| React.ReactNode;
}