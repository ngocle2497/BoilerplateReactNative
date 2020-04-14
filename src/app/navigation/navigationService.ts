import * as React from 'react';
export const navigationRef = React.createRef();


export function navigate(routeName: string, params = {}) {
  navigationRef.current?.navigate(routeName, params);
}

export function goBack() {
  navigationRef.current?.goBack()
}


