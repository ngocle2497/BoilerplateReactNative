/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, forwardRef, useImperativeHandle } from 'react';

import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';

import { RootStackParamList } from './screen-types';

const NavigationComponent = forwardRef((_, ref) => {
  // state
  const navigation = useNavigation();

  // effect
  useImperativeHandle(
    ref,
    () => ({
      navigate: (...args: any[]) => {
        // @ts-ignore
        navigation.navigate(...(args as never));
      },
      dispatch: (args: any) => {
        navigation.dispatch(args);
      },
    }),
    [navigation],
  );

  return null;
});

type NavigationRef = {
  navigate: (...args: any[]) => void;
  dispatch: (...args: any[]) => void;
};

const navigationRef = createRef<NavigationRef>();

export const NavigationService = () => (
  <NavigationComponent ref={navigationRef} />
);

export function navigateScreen<RouteName extends keyof RootStackParamList>(
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

export function pushScreen<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.current?.dispatch(
    StackActions.push(arg[0] as any, arg.length > 1 ? arg[1] : undefined),
  );
}

export function replaceScreen<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.current?.dispatch(
    StackActions.replace(arg[0] as any, arg.length > 1 ? arg[1] : undefined),
  );
}

export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack);
}
