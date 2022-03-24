import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Switch as SwitchAndroid } from './switch-android';
import { Switch as SwitchIOS } from './switch-ios';
import { SwitchProps } from './tye';

const SwitchComponent = (props: SwitchProps) => {
  // render
  return props.type === 'android' ? (
    <SwitchAndroid {...props} />
  ) : (
    <SwitchIOS {...props} />
  );
};

export const Switch = memo(SwitchComponent, isEqual);
