import React, { memo, forwardRef } from 'react';
import { InputFlat } from './components/Flat/InputFlat';
import { InputOutline } from './components/OutLine/InputOutline';
import { TextFieldProps } from './TextField.props';
import equals from 'react-fast-compare';

const TextFieldComponent = forwardRef<any, TextFieldProps>((props, ref) => {
  const { typeInput } = props;
  return typeInput === 'flat' ? (
    <InputFlat {...props} ref={ref} />
  ) : (
      <InputOutline {...props} ref={ref} />
    );
});
export const TextField = memo(
  TextFieldComponent,
  equals
);
