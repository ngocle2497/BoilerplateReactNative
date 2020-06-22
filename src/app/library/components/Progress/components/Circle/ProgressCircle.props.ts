import {TextStyle} from 'react-native';
export interface ProgressCircleProps {
  progress: number;

  bg: string;

  fg: string;

  strokeWidth: number;

  radius: number;

  showTextProgress: boolean;

  textProgressStyle: TextStyle | TextStyle[];
}
