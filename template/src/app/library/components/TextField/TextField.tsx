/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {forwardRef} from 'react';

import {InputFlat} from './components/Flat/InputFlat';
import {InputOutline} from './components/OutLine/InputOutline';
import {TextFieldProps} from './TextField.props';

const TextFieldComponent = forwardRef<any, TextFieldProps>((props, refs) => {
  // state
  const {typeInput} = props;

  // render
  return typeInput === 'flat' ? (
    <InputFlat {...props} ref={refs} />
  ) : (
    <InputOutline {...props} ref={refs} />
  );
});
export const TextField = TextFieldComponent;
