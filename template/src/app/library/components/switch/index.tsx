import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

import {SwitchProps} from './tye';
import {Switch as SwitchIOS} from './switch-ios';
import {Switch as SwitchAndroid} from './switch-android';

const SwitchComponent = (props: SwitchProps) => {
  // render
  return props.type === 'android' ? (
    <SwitchAndroid {...props} />
  ) : (
    <SwitchIOS {...props} />
  );
};

export const Switch = memo(SwitchComponent, isEqual);
