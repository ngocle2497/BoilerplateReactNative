/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from 'react';

import isEqual from 'react-fast-compare';
import { useController, useFormContext } from 'react-hook-form';

import { CustomOmit } from '@common';
import { HelperText, TextField } from '@components';
import { InputFlatProps } from '@library/components/text-field/components/flat/type';
import { FormLoginType } from '@model/login';

interface InputProps<T extends Record<string, any>>
  extends CustomOmit<InputFlatProps, 'nameTrigger'>,
    React.RefAttributes<any> {
  name: keyof T;
  nameTrigger?: keyof T;
}
const InputComponent = <T extends Record<string, any>>({
  onSubmit,
  label,
  name,
  nameTrigger,
  defaultValue = '',
  ...rest
}: InputProps<T>) => {
  // state
  const { trigger, getValues } = useFormContext<FormLoginType>();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: name as string,
    defaultValue,
  });
  // render
  return (
    <>
      <TextField
        onSubmit={onSubmit}
        ref={field.ref}
        nameTrigger={nameTrigger as string}
        trigger={trigger}
        error={invalid}
        label={label}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        defaultValue={(getValues() as Record<string, string>)[name as string]}
        typeInput={'flat'}
        {...rest}
      />
      <HelperText visible={invalid} msg={error?.message ?? ''} type={'error'} />
    </>
  );
};

export const Input = memo(InputComponent, isEqual) as <T>(
  props: InputProps<T>,
) => React.ReactElement;
