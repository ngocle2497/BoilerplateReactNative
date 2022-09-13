/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRef } from 'react';

import { RootStackParamList } from '@navigation/screen-types';
import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.current?.navigate(
    arg[0] as any,
    arg.length > 1 ? arg[1] : undefined,
  );
}

export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack);
}
