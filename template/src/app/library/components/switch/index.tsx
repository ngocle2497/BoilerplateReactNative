import React from 'react';

import { Switch as SwitchAndroid } from './switch-android';
import { Switch as SwitchIOS } from './switch-ios';
import { SwitchProps } from './type';

export const Switch = (props: SwitchProps) => {
  // render
  return props.type === 'android' ? (
    <SwitchAndroid {...props} />
  ) : (
    <SwitchIOS {...props} />
  );
};
