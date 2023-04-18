import { RegisterNavigationParams } from "@model/navigation-params";
import { NativeStackScreenProps as RNStackScreenProps } from "@react-navigation/native-stack";

export enum APP_SCREEN {
  UN_AUTHORIZE = "UN_AUTHORIZE",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",

  AUTHORIZE = "AUTHORIZE",
  HOME = "HOME",
}

export type RootStackParamList = {
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: RegisterNavigationParams;
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.AUTHORIZE]: undefined;
  [APP_SCREEN.HOME]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  RNStackScreenProps<RootStackParamList, T>;
