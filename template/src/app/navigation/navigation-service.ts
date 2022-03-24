/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRef } from 'react';

import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

import { RootStackParamList } from './screen-types';

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

export function navigateMerge<RouteName extends keyof RootStackParamList>(
  options: undefined extends RootStackParamList[RouteName]
    ? {
        name: RouteName;
        params?: RootStackParamList[RouteName];
      }
    : {
        name: RouteName;
        params: RootStackParamList[RouteName];
      },
) {
  navigationRef.current?.navigate({
    key: options.name,
    name: options.name,
    params: options.params,
    merge: true,
  });
}

export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack);
}
