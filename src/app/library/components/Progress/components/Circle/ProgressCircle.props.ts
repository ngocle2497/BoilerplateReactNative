import {TextStyle, StyleProp} from "react-native";
export interface ProgressCircleProps {
  progress: number;

  bg: string;

  fg: string;

  strokeWidth: number;

  radius: number;

  showTextProgress: boolean;

  textProgressStyle?: StyleProp<TextStyle>;
}
