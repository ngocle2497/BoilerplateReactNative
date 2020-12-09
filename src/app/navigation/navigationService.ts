import React, { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './screenTypes';
export const navigationRef = createRef<NavigationContainerRef>();

export function navigate<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ? [RouteName] | [RouteName, RootStackParamList[RouteName]]
    : [RouteName, RootStackParamList[RouteName]]
) {
  navigationRef.current?.navigate(arg[0], arg.length > 1 ? arg[1] : undefined);
}

export function goBack() {
  navigationRef.current?.goBack();
}
