import { TextStyle } from 'react-native';
export interface ProgressProps{

    type:'linear'|'circle';

    progress:number;

    bg?: string;

    fg?: string;

    strokeWidth?:number;

    radius?:number;

    showTextProgress?:boolean;

    textProgressStyle?: TextStyle | TextStyle[];
}