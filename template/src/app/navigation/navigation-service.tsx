import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import { RootStackParamList } from './screen-types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateScreen<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  navigationRef.navigate(arg[0], arg.length > 1 ? arg[1] : undefined);
}

export function pushScreen<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.dispatch(
    StackActions.push(arg[0], arg.length > 1 ? arg[1] : undefined),
  );
}

export function replaceScreen<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.dispatch(
    StackActions.replace(arg[0], arg.length > 1 ? arg[1] : undefined),
  );
}

export function goBack() {
  navigationRef.dispatch(CommonActions.goBack);
}
