import {ViewStyle, TextStyle} from "react-native";
import {IconTypes} from "@assets/icon";

export interface HeaderProps {
  headerTx?: string;

  headerText?: string;

  leftIcon?: IconTypes;

  onLeftPress?(): void;

  rightIcon?: IconTypes;

  onRightPress?(): void;

  style?: ViewStyle | ViewStyle[];

  titleStyle?: TextStyle | TextStyle[];

  childrenLeft?: React.ReactNode;

  childrenRight?: React.ReactNode;

  styleLeft?: ViewStyle | ViewStyle[];

  styleRight?: ViewStyle | ViewStyle[];
}
