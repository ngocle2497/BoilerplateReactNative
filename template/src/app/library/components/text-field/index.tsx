/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';

import { InputFlat } from './components/flat';
import { InputOutline } from './components/out-line';
import { TextFieldProps } from './type';

export const TextField = forwardRef<any, TextFieldProps>((props, refs) => {
  // state
  const { typeInput } = props;

  // render
  return typeInput === 'flat' ? (
    <InputFlat {...props} ref={refs} />
  ) : (
    <InputOutline {...props} ref={refs} />
  );
});
