/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {memo, forwardRef} from 'react';
import {TextField} from '@components';
import isEqual from 'react-fast-compare';
import {FieldError} from 'react-hook-form';

import {FormValue} from './FormLogin';

interface InputProps {
  name: keyof FormValue;
  label: string;
  error?: FieldError | undefined;
  onSubmit?: () => void;
  nameTrigger?: keyof FormValue;
}

const InputComponent = forwardRef<any, InputProps>(
  ({onSubmit, label, name, nameTrigger, error, ...rest}, ref) => {
    return (
      <TextField
        onSubmit={onSubmit}
        ref={ref}
        nameTrigger={nameTrigger}
        error={error?.message !== undefined}
        label={label}
        name={name}
        typeInput={'flat'}
        {...rest}
      />
    );
  },
);

export const Input = memo(InputComponent, isEqual);
