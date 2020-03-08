import * as React from 'react';
import * as ScreenTypes from './screenTypes'
export const navigationRef = React.createRef();


export function navigate(routeName:keyof typeof ScreenTypes, params = {}) {
  navigationRef.current?.navigate(routeName, params);
}

export function goBack(key) {
  // _navigator.dispatch(NavigationActions.back({key: key}));
}

export function replaceScreen(routeName, params) {
  // _navigator.dispatch(StackActions.replace({routeName, params}));
}

